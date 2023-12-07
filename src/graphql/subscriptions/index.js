const Subscription = {
    count: {
        subscribe: (_, args, { pubsub }, info) => {
            let i = 0;
            let random;
            setInterval(() => {
                random = Math.random()
                return pubsub.publish('count', {
                    count: random
                });
            }, 1000);

            return pubsub.subscribe('count');
        },
        resolve: payload => {
            console.log(payload);
            return payload;
        }
    },
    comment: {
        subscribe: (parent, { postId }, { db, pubsub }, info) => {
            const post = db.posts.find(post => post.id === postId && post.published)
            if (!post) throw new Error('Post not found');
            return pubsub.subscribe(`comment ${postId}`);
        }
        // ,
        // resolve: payload => {
        //     console.log(payload);
        //     return payload;
        // }
    },
    post: {
        subscribe: (parent, arg, { pubsub }, info) => {
            return pubsub.subscribe("POST");
        }
    }
};

export { Subscription as default };