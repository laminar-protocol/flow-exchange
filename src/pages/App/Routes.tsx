import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { useApp } from '../../hooks/useApp';
import Dashboard from '../Dashboard';
import Lending from '../Deposit';
import Home from '../Home';
import Layout from '../Layout';
import Liquidity from '../Liquidity';
import LiquidityCreate from '../Liquidity/LiquidityCreate';
import PoolDetail from '../Liquidity/PoolDetail';
import Swap from '../Swap';
import Margin from '../Margin';

const Routes: React.FC = () => {
  const currentApi = useApp(state => state.api);

  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path="/margin">
        <Layout loading={!currentApi}>
          <Margin />
        </Layout>
      </Route>
      <Route path="/dashboard">
        <Layout loading={!currentApi}>
          <Dashboard />
        </Layout>
      </Route>
      <Route path="/lending">
        <Layout loading={!currentApi}>
          <Lending />
        </Layout>
      </Route>
      <Route exact path="/liquidity">
        <Layout loading={!currentApi}>
          <Liquidity />
        </Layout>
      </Route>
      <Route path="/liquidity/new">
        <Layout loading={!currentApi}>
          <LiquidityCreate />
        </Layout>
      </Route>
      <Route path="/liquidity/:poolId">
        <Layout loading={!currentApi}>
          <PoolDetail />
        </Layout>
      </Route>
      <Route path="/swap">
        <Layout loading={!currentApi}>
          <Swap />
        </Layout>
      </Route>
    </Switch>
  );
};

export default Routes;
