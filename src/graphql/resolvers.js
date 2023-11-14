export const resolvers = {
    Query: {
        hello() {
            return 'this is my first query';
        },
        name() {
            return "hello world";
        },
        location() {
            return "this is my location";
        },
        bio() {
            return "this is my bio";
        }
    }
};