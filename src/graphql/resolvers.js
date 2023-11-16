import { compose, equals, filter, find, includes, pipe, prop, toLower } from "ramda";

const comments = [
    {
        id: 1,
        text: "comments"
    },
    {
        id: 2,
        text: "more comments"  
    },
    {
        id: 3,
        text: "more more comments"  
    },
    {
        id: 4,
        text: "more more more comments"  
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
        comments(parent, args, ctx, info){
            return comments;
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

            const getpost = filter(filterByPost)(posts)
            return getpost;    
        }
    }
};