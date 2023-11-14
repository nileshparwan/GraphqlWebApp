export const resolvers = {
    // Query: {
    //     id() {
    //         return 'abc12';
    //     },
    //     name() {
    //         return 'koshal';
    //     },
    //     age() {
    //         return 23;
    //     },
    //     employed() {
    //         return true;
    //     },
    //     gpa() {
    //         return 2.1; // can also be null
    //     }
    // },
    Query: {
        title() {
            return 'title';
        },
        price() {
            return 50;
        },
        releaseYear() {
            return null;
        },
        rating() {
            return 5.0;
        },
        inStock() {
            return true;
        }
    }
};