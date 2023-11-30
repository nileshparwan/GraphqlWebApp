import { equals, filter, find, pipe, prop} from "ramda";

const Post = {
    author(parent, args, { db }, info) {
        const userIsMatchingFn = pipe(
            prop('id'),
            propValue => equals(
                parseInt(propValue),
                parseInt(parent.author)
            )
        );
        const author = find(userIsMatchingFn)(db.users);
        return author;
    },
    comments(parent, args, { db }, info) {
        const currentPostId = prop('id')(parent);
        const filterPosts = pipe(
            prop("post"),
            postId => equals(
                postId,
                currentPostId
            )
        );
        return filter(filterPosts)(db.posts);
    }
}

export { Post as default };