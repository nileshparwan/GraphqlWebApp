import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { equals, find, pipe, prop, where } from 'ramda';

const Comment = {
    createComment(parent, args, { db }, info) {
        const autherId = prop('author')(args.data);
        const postId = prop('post')(args.data);

        const userExists = any(where({ id: equals(parseInt(autherId)) }), db.users);

        if (!userExists) {
            throw new GraphQLError(`Author does not exists`);
        }

        const postExistsAndPublished = any(where({
            id: equals(postId),
            published: equals(true)
        }), db.posts);

        if (!postExistsAndPublished) {
            throw new GraphQLError(`Post does not exists or is not published`);
        }

        const newComment = {
            id: uuidv4(),
            ...args.data
        };

        db.comments.push(newComment);

        return newComment;
    },
    deleteComment: (parent, args, { db }, info) => {
        const commentId = prop('id')(args);
        const commentIndex = findIndex(
            pipe(
                prop('id'),
                equals(parseInt(commentId))
            )
        )(db.comments);

        if (commentIndex < 0) {
            throw new GraphQLError("Couldn't find the comment");
        }
        const deletedComment = db.comments.splice(commentIndex, 1);
        return head(deletedComment);
    },
    updateComment: (parent, args, { db }, info) => {
        const commentId = prop('id')(args);
        const findComment = pipe(
            prop('id'),
            id => equals(parseInt(id), parseInt(commentId))
        );
        const comment = find(findComment)(db.comments);
        if (!comment) {
            throw new GraphQLError('Cannot find comment id');
        }
        if (typeof prop('text')(args.data) === 'string') {
            comment.text = prop('text')(args.data);
        }
        return comment;
    }
};

export { Comment as default };