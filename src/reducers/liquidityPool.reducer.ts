import { combineReducers } from 'redux';

import { addresses } from '../config';
import { createReducer } from '../helpers/apiLoadable';
import { actions } from '../types';

const POOLS_INITIAL_STATE = {
  byId: {
    POOL1: {
      id: 'POOL1',
      address: addresses.pool,
      name: 'Laminar',
    },
    POOL2: {
      id: 'POOL2',
      address: addresses.pool2,
      name: 'ACME',
    },
  },
  allIds: ['POOL1', 'POOL2'],
};

const reducer = combineReducers({
  spread: createReducer(actions.liquidityPool.spread),
  liquidity: createReducer(actions.liquidityPool.liquidity),
  allowedTokens: createReducer(actions.liquidityPool.allowedTokens),
  pools: (state = POOLS_INITIAL_STATE) => state,
});

export default reducer;
