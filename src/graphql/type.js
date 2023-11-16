/*
 * there are 5 type definitions 
 *   scalor = String, Boolean, Int, Float, ID
 * 
*/
export const typeDefs = /* GraphQL */ `
    type Query {
        me: User!
        post(query: String): [Post!]!
        users(query: String): [User!]!
        comments: [Comment!]!
        # product(id: String): Product
        # productionCollection(where: productInput, limit: Int): [ProductCollection]
    }

    input productInput {
        id: String!
        name: String
    }

    type User {
        id: ID!
        name: String!
        age: Int!
        email: String!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
    }

    # type Product {
    #     title: String!
    #     price: Float!
    #     releaseYear: Int
    #     rating: Float
    #     inStock: Boolean!
    # }

    # type ProductCollection {
    #     items: [Product]
    # }
`;