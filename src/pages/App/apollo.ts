import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const linkConfig = {
  laminar: {
    httpUri: 'https://indexer.laminar-chain.laminar.one/v1/graphql',
    wsUri: 'wss://indexer.laminar-chain.laminar.one/v1/graphql',
  },
  ethereum: {
    httpUri: 'https://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-kovan',
    wsUri: 'wss://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-kovan',
  },
};

const createApolloClient = (type: keyof typeof linkConfig) => {
  const cache = new InMemoryCache();

  const { httpUri, wsUri } = linkConfig[type];

  const httpLink = new HttpLink({
    uri: httpUri,
  });

  const wsLink = new WebSocketLink({
    uri: wsUri,
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

  return new ApolloClient({
    cache,
    link,
    connectToDevTools: true,
  });
};

export default createApolloClient;
