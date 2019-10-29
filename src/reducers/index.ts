import { Epic as ReduxEpic } from 'redux-observable';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ethereum from './ethereum.reducer';
import market from './market.reducer';
import setting from './setting.reducer';
import spotRate from './spotRate.reducer';
import swap from './swap.reducer';
import token from './token.reducer';
import margin from './margin.reducer';

const reducer = (history: any) => combineReducers({
  router: connectRouter(history),
  ethereum,
  market,
  setting,
  spotRate,
  swap,
  token,
  margin,
});

export default reducer;

export type AppState = ReturnType<ReturnType<typeof reducer>>;

export type Epic = ReduxEpic<any, any, AppState>;
