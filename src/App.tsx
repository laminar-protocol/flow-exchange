import { ApolloProvider } from '@apollo/react-hooks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import apolloClient from './apollo';
import NoWallet from './app/NoWallet';
import { useApp, useAppApi, useDispatch } from './hooks';
import Layout from './pages/Layout';
import store, { history } from './reduxStore';
import { GlobalStyle } from './styles';
import { actions } from './types';

library.add(fas);

const AppInit: React.FC = () => {
  const available = useApp(state => state.availableProvider);
  const currentTheme = useApp(state => state.currentTheme);
  const api = useApp(state => state.provider && state.provider.api);
  const init = useApp(state => state.init);
  const dispatch = useDispatch();

  useEffect(() => {
    init();
    // @TODO remove
    dispatch(actions.app.init.trigger());
  }, [dispatch, init]);

  useEffect(() => {
    if (api) {
      const s = api.accounts$.subscribe(accounts => {
        useAppApi.setState(state => (state.currentAccount = accounts[0]));
      });

      return () => {
        s.unsubscribe();
      };
    }
  }, [api]);

  if (!available.length) {
    return <NoWallet />;
  }

  return (
    <ThemeProvider theme={{ mode: currentTheme }}>
      <>
        <GlobalStyle />
        <Layout />
      </>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={apolloClient}>
          <AppInit />
        </ApolloProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
