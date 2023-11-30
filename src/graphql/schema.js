import { createSchema, createYoga } from 'graphql-yoga';
import db from '../db';

export const graphqlSchema = ({ typeDefs, resolvers, logging = false }) => {
    return createYoga({
        schema: createSchema({
            typeDefs,
            resolvers
        }),
        context() {
            return {
                db
            };
        },
        logging,
    });
};