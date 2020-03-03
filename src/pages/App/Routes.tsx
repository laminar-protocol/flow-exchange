import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Margin from '../../app/margin/margin';
import Dashboard from '../Dashboard';
import Lending from '../Deposit';
import Home from '../Home';
import Liquidity from '../Liquidity';
import Swap from '../Swap';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/lending">
        <Lending />
      </Route>
      <Route exact path="/margin">
        <Redirect to="/margin/POOL1/EURUSD" />
      </Route>
      <Route path="/margin/:pool/:tradingSymbol">
        <Margin />
      </Route>
      <Route path="/liquidity">
        <Liquidity />
      </Route>
      <Route path="/swap">
        <Swap />
      </Route>
    </Switch>
  );
};

export default Routes;
