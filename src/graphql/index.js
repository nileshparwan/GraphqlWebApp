import UserResolver from "./resolvers/User";
import PostResolver from "./resolvers/Post";
import CommentResolver from "./resolvers/Comment";
import UserMutations from "./mutations/User";
import PostMutations from "./mutations/Post";
import CommentMutations from "./mutations/Comment";
import Query from './Query'

export default {
    Query,
    User: UserResolver, // relationship between user and post
    Post: PostResolver, // relationship between post author (user) and comments
    Comment: CommentResolver, // relationship between post author (user) and post
    Mutation: {
        ...UserMutations,
        ...PostMutations,
        ...CommentMutations
    }
};