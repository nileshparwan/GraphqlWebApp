import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { equals, find, pipe, prop } from 'ramda';

const Post = {
    createPost(parent, args, { db }, info) {
        const theUser = pipe(
            prop('id'),
            equals(parseInt(args.data.author))
        );

        const userExists = find(theUser)(db.users);

        if (!userExists) {
            throw new GraphQLError('Author not found');
        }

        const newPost = {
            id: uuidv4(),
            ...args.data
        };

        db.posts.push(newPost);

        return newPost;
    },
    deletePost: (parents, args, { db }, info) => {
        const postId = prop('id')(args);
        const postIndex = findIndex(
            pipe(
                prop('id'),
                equals(postId)
            )
        )(db.posts);
        if (postIndex < 0) {
            throw new GraphQLError('Post does not exist');
        }

        const deletedPost = db.posts.splice(postIndex, 1);

        db.posts = filter(post => {
            const match = post.id == postId;
            // if (match) {
            //     comments = filter(comment => {
            //         return comment.post != post.id;
            //     })(comments);
            // }   
            return !match;
        })(db.posts);

        db.comments = filter(comment => comment.post != args.id)(db.comments);

        return head(deletedPost);

    },
    updatePost: (parents, args, { db }, info) => {
        const postId = prop('id')(args);
        const findPost = pipe(
            prop('id'),
            id => equals(id, postId)
        );
        const post = find(findPost)(db.posts);
        if (!post) {
            return new GraphQLError('Post does not exist');
        }

        if (typeof prop('title')(args.data) === 'string') {
            post.title = prop('title', args.data);
        }

        if (typeof prop('body')(args.data) === 'string') {
            post.body = prop('body', args.data);
        }

        if (typeof prop('published')(args.data) === 'boolean') {
            post.published = prop('published', args.data);
        }

        return post;
    }
}

export { Post as default };