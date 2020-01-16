import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import * as Sentry from '@sentry/browser';

import { subgraphEndpoints } from 'config';
import Application from 'app/Application';
import * as serviceWorker from 'serviceWorker';

import store, { history } from './store';
import ethereum from './services/ethereum';
import NoService from './app/common/NoService';

import 'antd/dist/antd.css';

Sentry.init({ dsn: 'https://d480bdd4a4314799a685468721b3e891@sentry.io/1814370' });

library.add(fas);

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

const render = (App: React.ComponentType) => {
  ReactDOM.render(
    ethereum.provider ? (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ConnectedRouter>
      </Provider>
    ) : (
      <NoService />
    ),
    document.getElementById('root'),
  );
};

render(Application);

serviceWorker.unregister();

if ((module as any).hot) {
  (module as any).hot.accept('./app/Application', () => {
    // eslint-disable-next-line
    const NextApp = require('./app/Application').default;
    render(NextApp);
  });
}
