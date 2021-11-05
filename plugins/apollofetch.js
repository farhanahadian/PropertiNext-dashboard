import { createApolloFetch } from 'apollo-fetch';
const BASE_URL = process.env.APP_URL || 'http://localhost:3003';
const uri = BASE_URL + '/api/graphql';
const apolloFetch = createApolloFetch({ uri });

export default apolloFetch