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
        # productionCollection(where: ProductInput, limit: Int): [ProductCollection]
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput): Comment!
        deleteComment(id: ID!): Comment!
    }

    input CreateCommentInput {
        text:String!
        author: ID!
        post: ID!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!,
        body: String!
        published: Boolean!
        author: ID!
    }

    input ProductInput {
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
        comments:[Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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