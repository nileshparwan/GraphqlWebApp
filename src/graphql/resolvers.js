import { GraphQLError } from 'graphql';
import { compose, equals, filter, find, includes, pipe, prop, toLower } from "ramda";
import { v4 as uuidv4 } from 'uuid';

const comments = [
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

const users = [
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

const posts = [
    {
        id: "092",
        title: "102",
        body: "bnjk",
        published: false,
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

            const emailTaken = users.some(user => {
                return user.email === args.email;
            });

            if (emailTaken) {
                throw new GraphQLError(`Email exist`);
            }

            newUser = {
                id: uuidv4,
                name: args.name,
                email: args.email,
                age: args.age
            };

            users.push(newUser);

            return newUser;
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