import { ApolloProvider } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { useSetting } from '../../hooks';
import { useApp } from '../../hooks/useApp';
import createApolloClient from './apollo';
import Init from './Init';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';

const AppInit: React.FC = () => {
  const api = useApp(state => state.api);
  const mode = useSetting(state => state.setting.currentTheme);

  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    if (api && api.chainType === 'laminar') {
      const client = createApolloClient({
        httpUri: 'https://indexer.laminar-chain.laminar.one/v1/graphql',
        wsUri: 'wss://indexer.laminar-chain.laminar.one/v1/graphql',
      });
      setClient(client);
    } else {
      const client = createApolloClient({
        httpUri: 'https://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-kovan',
        wsUri: 'wss://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-kovan',
      });
      setClient(client);
    }
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
