import { createSchema, createYoga } from 'graphql-yoga';

export const graphqlSchema = ({ typeDefs, resolvers, logging = false }) => {
    return createYoga({
        schema: createSchema({
            typeDefs,
            resolvers
        }),
        logging,
    });
};