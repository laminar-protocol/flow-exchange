import { Epic as ReduxEpic } from 'redux-observable';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ethereum from './ethereum.reducer';
import setting from './setting.reducer';
import swap from './swap.reducer';
import token from './token.reducer';
import margin from './margin.reducer';
import liquidityPool from './liquidityPool.reducer';

const reducer = (history: any) => combineReducers({
  router: connectRouter(history),
  ethereum,
  setting,
  swap,
  token,
  margin,
  liquidityPool,
});

export default reducer;

export type AppState = ReturnType<ReturnType<typeof reducer>>;

export type Epic = ReduxEpic<any, any, AppState>;
