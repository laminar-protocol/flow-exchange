import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MarginPool from './MarginPool';
import MarginPools from './MarginPools';

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
