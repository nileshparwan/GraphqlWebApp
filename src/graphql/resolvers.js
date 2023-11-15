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
        },
        greeting(parent, args, ctx, info) {
            /*
            * @parent: useful when working with relational databases
            * @args: this contains the operation arguments supplied
            * @ctx: useful for contextual data, if a user is logged in context, might contain the ID of the user so that we can access it throughout the operation.
            * @info: contains great information about the actual operation that were sent
            */
            // console.log({parent, args, ctx, info});
            if (args.name && args.position) {
                return `${args.name} ${args.position}`;
            }
            return "hello";
        },
        add(parent, { a, b }, ctx, info) {
            return a + b;
        }
    },
};