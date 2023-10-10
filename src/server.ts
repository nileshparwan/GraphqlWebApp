import express from 'express';
import { graphqlHTTP } from 'express-graphql';
// internal
import schema from '@schema/schema';
// variables
const app = express();
console.log(schema);

// middleware
app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  )

app.listen(4000, () => {
    console.log('app running on port 4000');
})