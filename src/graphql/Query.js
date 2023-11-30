const Query = {
    me() {
        return {
            id: "23",
            name: "Koshal",
            age: 20,
            email: "test@test.com"
        };
    },
    post(parents, { query }, { db }, info) {
        if (!query) {
            return db.posts;
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
        })(db.posts);
    },
    users(parent, { query }, { db }, info) {
        if (!query) {
            return db.users;
        }
        return filter((user) => {
            const name = pipe(
                prop('name'),
                toLower,
                includes(toLower(query))
            )(user);
            return name;
        })(db.users);
    },
    comments(parent, args, { db }, info) {
        return db.comments;
    }
};

export { Query as default };