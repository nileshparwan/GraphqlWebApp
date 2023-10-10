import { GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { find, propEq } from 'ramda';

const users = [
    { id: '23', firstName: 'Bill', age: 20 },
    { id: '47', firstName: 'samantha', age: 21 },
];

// field definition
const UserType = new GraphQLObjectType({
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
    }
});

// query
// i have a user object and if you give me an id, i will return you an array of userType
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return find(propEq(args.id, 'id'))(users);
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});