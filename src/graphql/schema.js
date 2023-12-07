import { createSchema, createYoga, createPubSub } from 'graphql-yoga';
import db from '../db';

const pubsub = createPubSub()

export const graphqlSchema = ({ typeDefs, resolvers, logging = false }) => {
    return createYoga({
        schema: createSchema({
            typeDefs,
            resolvers
        }),
        context() {
            return {
                db,
                pubsub
            };
        },
        logging,
        graphiql: true
    });
};