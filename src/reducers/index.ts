import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ethereum from './ethereum.reducer';
import flow from './flow.reducer';
import market from './market.reducer';
import setting from './setting.reducer';
import spotRate from './spotRate.reducer';
import swap from './swap.reducer';
import token from './token.reducer';

const reducer = (history: any) => combineReducers({
  router: connectRouter(history),
  ethereum,
  flow,
  market,
  setting,
  spotRate,
  swap,
  token,
});

export default reducer;

export type AppState = ReturnType<ReturnType<typeof reducer>>;
