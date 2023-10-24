import { GraphQLSchema } from 'graphql';
import { RootQuery } from './query';

export default new GraphQLSchema({
    query: RootQuery
});