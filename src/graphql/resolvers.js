import { GraphQLError } from 'graphql';
import { any, compose, equals, filter, find, findIndex, head, includes, not, pipe, prop, propEq, propOr, propSatisfies, toLower, toString, where } from "ramda";
import { v4 as uuidv4 } from 'uuid';

let comments = [
    {
        id: 1,
        text: "comments",
        author: 1,
        post: "092"
    },
    {
        id: 2,
        text: "more comments",
        author: 1,
        post: "093"
    },
    {
        id: 3,
        text: "more more comments",
        author: 2,
        post: "094"
    },
    {
        id: 4,
        text: "more more more comments",
        author: 2,
        post: "094"
    }
];

let users = [
    {
        id: 1,
        name: "koshal",
        email: "koshal@test.com",
        age: 27,
    },
    {
        id: 2,
        name: "Mike",
        email: "mike@test.com",
        age: 28,
    },
    {
        id: 3,
        name: "sara",
        email: "sara@test.com",
        age: 29
    }
];

let posts = [
    {
        id: "092",
        title: "102",
        body: "bnjk",
        published: true,
        author: '1'
    },
    {
        id: "093",
        title: "103",
        body: "bvfd",
        published: true,
        author: '1'
    },
    {
        id: "094",
        title: "104",
        body: "yuio",
        published: false,
        author: '2'
    }
];

export const resolvers = {
    Query: {
        me() {
            return {
                id: "23",
                name: "Koshal",
                age: 20,
                email: "test@test.com"
            };
        },
        post(parents, { query }, ctx, info) {
            if (!query) {
                return posts;
            }
            return filter((post) => {
                const title = compose(
                    includes(toLower(query)),
                    toLower,
                    prop('title')
                )(post);

                const body = pipe(
                    prop('body'),
                    toLower,
                    includes(toLower(query))
                )(post);

                return title || body;
            })(posts);
        },
        users(parent, { query }, ctx, info) {
            if (!query) {
                return users;
            }
            return filter((user) => {
                const name = pipe(
                    prop('name'),
                    toLower,
                    includes(toLower(query))
                )(user);
                return name;
            })(users);
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            let newUser;

            const emailExists = any(where({ email: equals(args.data.email) }), users)

            if (emailExists) {
                throw new GraphQLError(`Email exist`);
            }

            newUser = {
                id: uuidv4(),
                ...args.data
            };

            users.push(newUser);

            return newUser;
        },
        deleteUser: (parents, args, ctx, info) => {
            const userId = prop('id')(args);
            const userIndexFn = pipe(
                prop('id'),
                toString,
                equals(userId)
            )
            const userIndex = findIndex(userIndexFn)(users);
            if(userIndex < 0){
                throw new GraphQLError("User not found");
            }
            
            const deletedUser = users.splice(userIndex, 1);

            posts = filter(post => {
                const match = post.author == args.id;

                // if(match){
                //     comments = filter(comment => comment.post != post.id)(comments);
                //     console.log(">>", comments)
                // }

                return !match;
            })(posts)

            comments = filter(comment => comment.author != args.id)(comments);
            console.log(comments);
            return head(deletedUser);
        },
        createPost(parent, args, ctx, info) {
            const theUser = pipe(
                prop('id'),
                equals(parseInt(args.data.author))
            );

            const userExists = find(theUser)(users);

            if (!userExists) {
                throw new GraphQLError('Author not found');
            }

            const newPost = {
                id: uuidv4(),
                ...args.data
            };

            posts.push(newPost);

            return newPost;
        },
        deletePost: (parents, args, ctx, info) => {
            const postId = prop('id')(args);
            const postIndex = findIndex(
                pipe(
                    prop('id'),
                    equals(postId)
                )
            )(posts);
            if (postIndex < 0) {
                throw new GraphQLError('Post does not exist')
            }

            const deletedPost = posts.splice(postIndex, 1);

            posts = filter(post => {
                const match = post.id == postId;
                // if (match) {
                //     comments = filter(comment => {
                //         return comment.post != post.id;
                //     })(comments);
                // }   
                return !match;
            })(posts)
            
            comments = filter(comment => comment.post != args.id)(comments);

            return head(deletedPost);

        },
        createComment(parent, args, ctx, info) {
            const autherId = prop('author')(args.data);
            const postId = prop('post')(args.data);

            const userExists = any(where({ id: equals(parseInt(autherId)) }), users);

            if (!userExists) {
                throw new GraphQLError(`Author does not exists`);
            }

            const postExistsAndPublished = any(where({
                id: equals(postId),
                published: equals(true)
            }), posts)

            if (!postExistsAndPublished) {
                throw new GraphQLError(`Post does not exists or is not published`);
            }

            const newComment = {
                id: uuidv4(),
                ...args.data
            };

            comments.push(newComment);

            return newComment;
        },
        deleteComment: (parent, args, ctx, info) => {
            const commentId = prop('id')(args);
            const commentIndex = findIndex(
                pipe(
                    prop('id'),
                    equals(parseInt(commentId))
                )
            )(comments);

            if (commentIndex < 0) {
                throw new GraphQLError("Couldn't find the comment");
            }
            const deletedComment = comments.splice(commentIndex, 1);
            return head(deletedComment);
        }
    },
    // has to match the type name
    Post: {
        author(parent, args, ctx, info) {
            const userIsMatchingFn = pipe(
                prop('id'),
                propValue => equals(
                    parseInt(propValue),
                    parseInt(parent.author)
                )
            );
            const author = find(userIsMatchingFn)(users);
            return author;
        },
        comments(parent, args, ctx, info) {
            const currentPostId = prop('id')(parent);
            const filterPosts = pipe(
                prop("post"),
                postId => equals(
                    postId,
                    currentPostId
                )
            );
            return filter(filterPosts)(posts);
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            const filterByPost = pipe(
                prop('author'),
                (idAuther) => equals(
                    parseInt(idAuther),
                    parseInt(parent.id)
                )
            );
            const getpost = filter(filterByPost)(posts);
            return getpost;
        },
        comments(parent, args, ctx, info) {
            const authorId = prop('id', parent);
            const filterAuthor = pipe(
                prop('author'),
                (idAuther) => equals(
                    parseInt(idAuther),
                    parseInt(authorId)
                )
            );
            return filter(filterAuthor)(comments);
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            const authorId = prop('author', parent);
            const user = pipe(
                prop('id'),
                currentId => equals(
                    parseInt(currentId),
                    parseInt(authorId)
                )
            );
            const getUser = find(user)(users);
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
    }
};