import 'antd/dist/antd.css';

import { ApolloProvider } from '@apollo/react-hooks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/browser';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Application from 'app/Application';
import { subgraphEndpoints } from 'config';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';

import NoService from './app/common/NoService';
import ethereum from './services/ethereum';
import store, { history } from './store';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://d480bdd4a4314799a685468721b3e891@sentry.io/1814370' });
}

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
