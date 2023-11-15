import { init } from "./server";
import { graphqlSchema } from './graphql/schema';
import { typeDefs } from './graphql/type';
import { resolvers } from './graphql/resolvers';

const startServer = async () => {
    const app = await init();
    const gqlServer = graphqlSchema({ typeDefs, resolvers, logging: false });

    // middleware
    app.use(gqlServer.graphqlEndpoint, gqlServer);

    app.listen(4000, () => {
        console.log('app running on port 4000');
        console.log('http://localhost:4000/graphql');
    });
};

startServer();