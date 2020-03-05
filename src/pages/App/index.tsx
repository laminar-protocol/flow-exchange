import { ApolloProvider } from '@apollo/react-hooks';
import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { useDispatch, useSetting } from '../../hooks';
import store, { history } from '../../reduxStore';
import { actions } from '../../types';
import apolloClient from './apollo';
import Init from './Init';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';

const AppInit: React.FC = () => {
  const mode = useSetting(state => state.setting.currentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    // @TODO remove
    dispatch(actions.app.init.trigger());
  }, [dispatch]);

  return (
    <StyledThemeProvider theme={{ mode }}>
      <ThemeProvider mode={mode}>
        <Init />
        <Routes />
      </ThemeProvider>
    </StyledThemeProvider>
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
