/*
 * there are 5 type definitions 
 *   - String, Boolean, Int, Float, ID
 * 
*/
export const typeDefs = /* GraphQL */ `
    # type Query {
    #     id: ID!
    #     name: String!
    #     age: Int!
    #     employed: Boolean!
    #     gpa: Float
    # }

    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;