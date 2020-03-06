import { combineReducers } from 'redux';

import { actions } from '../../types';
import { addresses } from '../config';
import { createReducer } from '../helpers/apiLoadable';

const POOLS_INITIAL_STATE = {
  byId: {
    POOL1: {
      id: 'POOL1',
      address: addresses.pool,
      name: 'Laminar',
    } as Pool,
    POOL2: {
      id: 'POOL2',
      address: addresses.pool2,
      name: 'ACME',
    } as Pool,
  },
  allIds: ['POOL1', 'POOL2'],
};

const reducer = combineReducers({
  spread: createReducer(actions.liquidityPool.spread),
  liquidity: createReducer(actions.liquidityPool.liquidity),
  allowedTokens: createReducer(actions.liquidityPool.allowedTokens),
  pools: (state: typeof POOLS_INITIAL_STATE = POOLS_INITIAL_STATE) => state,
});

export default reducer;
