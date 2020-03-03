import { ApolloProvider } from '@apollo/react-hooks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { useApp, useAppApi, useDispatch, useSetting } from '../../hooks';
import store, { history } from '../../reduxStore';
import { GlobalStyle } from '../../styles';
import { actions } from '../../types';
import apolloClient from './apollo';
import Init from './Init';
import Routes from './Routes';

library.add(fas);

const AppInit: React.FC = () => {
  const currentTheme = useSetting(state => state.setting.currentTheme);
  const api = useApp(state => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    // @TODO remove
    dispatch(actions.app.init.trigger());
  }, [dispatch]);

  return (
    <ThemeProvider theme={{ mode: currentTheme }}>
      <Init />
      <GlobalStyle />
      <Routes />
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
