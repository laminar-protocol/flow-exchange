import { ApolloProvider } from '@apollo/react-hooks';
import React, { useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useApp from '../../store/useApp';
import useSetting from '../../store/useSetting';
import createApolloClient from './apollo';
import AppInit from './AppInit';
import BalancesFeed from './BalancesFeed';
import OracleFeed from './OracleFeed';
import Routes from './Routes';
import ThemeProvider from './ThemeProvider';

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
