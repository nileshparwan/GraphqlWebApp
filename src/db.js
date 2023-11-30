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

const db = {
    users,
    posts,
    comments
}

export { db as default };