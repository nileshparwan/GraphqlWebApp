import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// internal
import schema from '@schema/schema';

export const init = async () => {
  // variables
  const app = express();

  // middleware
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  )

  return app;
}