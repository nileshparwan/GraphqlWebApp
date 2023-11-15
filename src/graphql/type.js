/*
 * there are 5 type definitions 
 *   - String, Boolean, Int, Float, ID
 * 
*/
export const typeDefs = /* GraphQL */ `
    type Query {
        me: User!
        post: Post!
        add(a: Float!, b: Float!): Float!
        product(id: String): Product
        greeting(name: String, position: String): String!
        productionCollection(where: productInput, limit: Int): [ProductCollection]
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
    }

    type Product {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }

    type ProductCollection {
        items: [Product]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;