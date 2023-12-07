import { equals, pipe, prop, find } from "ramda";

const Comment = {
    author(parent, args, { db }, info) {
        const authorId = prop('author', parent);
        const user = pipe(
            prop('id'),
            currentId => equals(
                parseInt(currentId),
                parseInt(authorId)
            )
        );
        const getUser = find(user)(db.users);
        console.log(getUser);
        return getUser;
    },
    post(parent, args, ctx, info) {
        const currentPostId = prop('post', parent);
        const findPost = pipe(
            prop('post'),
            idPost => equals(idPost, currentPostId)
        );
        let allPosts = find(findPost)(Comment);
        return allPosts;
    }
};

export { Comment as default };

