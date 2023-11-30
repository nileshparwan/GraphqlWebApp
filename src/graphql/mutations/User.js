import { v4 as uuidv4 } from 'uuid';
import { GraphQLError } from 'graphql';
import { equals, find, pipe, prop, toString, where } from 'ramda';

const User = {
    createUser(parent, args, { db }, info) {
        let newUser;

        const emailExists = any(where({ email: equals(args.data.email) }), db.users);

        if (emailExists) {
            throw new GraphQLError(`Email exist`);
        }

        newUser = {
            id: uuidv4(),
            ...args.data
        };

        db.users.push(newUser);

        return newUser;
    },
    deleteUser: (parent, args, { db }, info) => {
        const userId = prop('id')(args);
        const userIndexFn = pipe(
            prop('id'),
            toString,
            equals(userId)
        );
        const userIndex = findIndex(userIndexFn)(db.users);
        if (userIndex < 0) {
            throw new GraphQLError("User not found");
        }

        const deletedUser = db.users.splice(userIndex, 1);

        db.posts = db.filter(post => {
            const match = post.author == args.id;

            // if(match){
            //     comments = filter(comment => comment.post != post.id)(comments);
            //     console.log(">>", comments)
            // }

            return !match;
        })(db.posts);

        db.comments = filter(comment => comment.author != args.id)(db.comments);
        return head(deletedUser);
    },
    updateUser: (parent, args, { db }, info) => {
        const userId = prop('id')(args);
        const data = prop('data')(args);

        const findUser = pipe(
            prop('id'),
            id => equals(id, parseInt(userId))
        );
        const user = find(findUser)(db.users);
        if (!user) {
            throw new GraphQLError("User not found");
        }

        if (typeof prop('email')(args) === 'string') {
            const emailExists = any(where({
                email: equals(prop('email')(data))
            }), db.user);

            if (emailExists) {
                throw new GraphQLError(`Email ${prop('email')(data)} already exists`);
            }

            user.email = prop('email')(data);
        }

        if (typeof prop('name')(data) === 'string') {
            user.name = prop('name')(data);
        }

        if (typeof prop('age')(data) !== 'undefined') {
            user.name = prop('name')(data);
        }

        return user;
    }
};

export { User as default };