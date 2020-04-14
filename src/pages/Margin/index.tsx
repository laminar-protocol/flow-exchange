import React from 'react';

import MarginPools from './MarginPools';
import MarginPool from './MarginPool';
import { Redirect, Route, Switch } from 'react-router-dom';

const Margin = () => {
  return (
    <Switch>
      <Route exact path="/margin">
        <MarginPools />
      </Route>
      <Route exact path="/margin/:poolId/:pairId">
        <MarginPool />
      </Route>
    </Switch>
  );
};

export default Margin;
