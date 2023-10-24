import { GraphQLObjectType, GraphQLString } from 'graphql';

export const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }, 
        description: {
            type: GraphQLString
        }
    }
})