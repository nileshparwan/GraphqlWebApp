import { equals, filter, pipe, prop } from "ramda";

const User = {
    posts(parent, args, { db }, info) {
        const filterByPost = pipe(
            prop('author'),
            (idAuther) => equals(
                parseInt(idAuther),
                parseInt(parent.id)
            )
        );
        const getpost = filter(filterByPost)(db.posts);
        return getpost;
    },
    comments(parent, args, { db }, info) {
        const authorId = prop('id', parent);
        const filterAuthor = pipe(
            prop('author'),
            (idAuther) => equals(
                parseInt(idAuther),
                parseInt(authorId)
            )
        );
        return filter(filterAuthor)(db.comments);
    }
}

export { User as default };