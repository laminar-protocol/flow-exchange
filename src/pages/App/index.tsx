import { ApolloProvider } from '@apollo/react-hooks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { useDispatch, useSetting } from '../../hooks';
import store, { history } from '../../reduxStore';
import { GlobalStyle, makeTheme } from '../../styles';
import { actions } from '../../types';
import apolloClient from './apollo';
import Init from './Init';
import Routes from './Routes';

library.add(fas);

const AppInit: React.FC = () => {
  const currentTheme = useSetting(state => state.setting.currentTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    // @TODO remove
    dispatch(actions.app.init.trigger());
  }, [dispatch]);

  const theme = useMemo(() => {
    return makeTheme({ mode: currentTheme });
  }, [currentTheme]);

  return (
    <StyledThemeProvider theme={{ mode: currentTheme }}>
      <ThemeProvider theme={theme}>
        <Init />
        <GlobalStyle />
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
