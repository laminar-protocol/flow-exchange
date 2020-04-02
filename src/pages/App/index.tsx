import { ApolloProvider } from '@apollo/react-hooks';
import React, { useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import useSetting from '../../hooks/useSetting';
import useApp from '../../hooks/useApp';
import createApolloClient from './apollo';
import Init from './Init';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';

const AppInit: React.FC = () => {
  const api = useApp(state => state.api);
  const mode = useSetting(state => state.setting.currentTheme);

  const client = useMemo(() => {
    return api ? createApolloClient(api.chainType) : null;
  }, [api]);

  return (
    <StyledThemeProvider theme={{ mode }}>
      <ThemeProvider mode={mode}>
        {client ? (
          <ApolloProvider client={client}>
            <Init />
            <Routes />
          </ApolloProvider>
        ) : (
          <>
            <Init />
            <Routes />
          </>
        )}
      </ThemeProvider>
    </StyledThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppInit />
    </Router>
  );
};

export default App;
