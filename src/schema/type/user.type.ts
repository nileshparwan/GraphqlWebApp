import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { CompanyType } from './company.type';

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLString
        },
        firstName: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                console.log({ parentValue })
            }
        }
    }
});