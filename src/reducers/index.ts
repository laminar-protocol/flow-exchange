import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import liquidityPool from './liquidityPool.reducer';
import margin from './margin.reducer';
import provider from './provider.reducer';
import setting from './setting.reducer';
import swap from './swap.reducer';
import token from './token.reducer';

export const reducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    provider,
    setting,
    swap,
    token,
    margin,
    liquidityPool,
  });

export default reducer;
