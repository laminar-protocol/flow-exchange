import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LiquidityMargin from './LiquidityMargin';
import LiquiditySwap from './LiquiditySwap';

const Margin = () => {
  return (
    <Switch>
      <Route exact path="/provider/margin">
        <LiquidityMargin />
      </Route>
      <Route exact path="/provider/swap">
        <LiquiditySwap />
      </Route>
    </Switch>
  );
};

export default Margin;
