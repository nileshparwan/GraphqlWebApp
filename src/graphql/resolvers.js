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
        post() {
            return {
                id: "092",
                title: "101",
                body: "",
                published: false
            };
        }
    },
};