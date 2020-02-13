import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { subgraphEndpoints } from './config';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: subgraphEndpoints.http,
});

const wsLink = new WebSocketLink({
  uri: subgraphEndpoints.ws,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache,
  link,
  connectToDevTools: true,
});

export default client;
