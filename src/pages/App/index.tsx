import { ApolloProvider } from '@apollo/react-hooks';
import React, { useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import useSetting from '../../store/useSetting';
import useApp from '../../store/useApp';
import createApolloClient from './apollo';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';

import OracleFeed from './OracleFeed';
import BalancesFeed from './BalancesFeed';
import AppInit from './AppInit';

const AppInner: React.FC = () => {
  const api = useApp(state => state.api);
  const mode = useSetting(state => state.setting.currentTheme);

  const client = useMemo(() => {
    return api ? createApolloClient(api.chainType) : null;
  }, [api]);

  return (
    <ThemeProvider mode={mode}>
      {client ? (
        <ApolloProvider client={client}>
          <OracleFeed />
          <BalancesFeed />
          <AppInit />
          <Routes />
        </ApolloProvider>
      ) : (
        <Routes />
      )}
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppInner />
    </Router>
  );
};

export default App;
