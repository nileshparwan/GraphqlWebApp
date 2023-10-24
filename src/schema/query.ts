import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './type/user.type';
import { getUserById } from 'src/services/user.service';
import { Iresp, Iuser } from 'src/interfaces';
import { prop } from 'ramda';
export const RootQuery = new GraphQLObjectType({
    name: "getUserById",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            async resolve(parentValue, args) {
                let resp: Iresp<Iuser>;
                try {
                    resp = await getUserById(`http://localhost:3000/users/${args.id}`);
                    if ('data' in resp) {
                        const data = prop('data', resp);
                        return data;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
});