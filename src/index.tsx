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

import { subgraphEndpoints } from 'config';
import Application from 'app/application/application.connect';
import * as serviceWorker from 'serviceWorker';

import store, { history } from './store';

import 'antd/dist/antd.css';

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
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
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
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </ConnectedRouter>
      </Provider>
    ),
    document.getElementById('root'),
  );
};

render(Application);

serviceWorker.unregister();

if ((module as any).hot) {
  (module as any).hot.accept('./app/application/application.connect', () => {
    // eslint-disable-next-line
    const NextApp = require('./app/application/application.connect').default;
    render(NextApp);
  });
}
