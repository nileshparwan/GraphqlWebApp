import express from 'express';
import { graphqlHTTP } from 'express-graphql';

export const init = async () => {
  // variables
  const app = express();

  return app;
}