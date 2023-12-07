import fs from 'fs';
import path from 'path';
import { init } from "./server";
import { graphqlSchema } from './graphql/schema';
import resolvers from './graphql';

const readTypeDefs = fs.readFileSync(path.join(__dirname, '/graphql/schema.gql'), 'utf8');
const gqlServer = graphqlSchema({
    typeDefs: readTypeDefs,
    resolvers: resolvers,
    logging: false
});

const startServer = async () => {
    const app = await init();

    // middleware
    app.use(gqlServer.graphqlEndpoint, gqlServer);

    app.listen(4000, () => {
        console.log('app running on port 4000');
        console.log('http://localhost:4000/graphiql');
    });
};

startServer();