import { createReducer } from '_app/helpers/apiLoadableSingle';
import { Reducer, combineReducers } from 'redux';
import { actions } from 'types';
import { DeepReadonly } from 'utility-types';

export type State = DeepReadonly<{
  allowance: ApiLoadableState<number>;
  trading: ApiLoadableState<number, boolean>;
  openPosition: ApiLoadableState<void, { name: string; amount: number; pool: string }>;
  closePosition: ApiLoadableState<void, { name: string; id: string }>;
}>;

const allowance = createReducer(actions.margin.allowance);
const trading = createReducer(actions.margin.toggleTrading);
const openPosition = createReducer(actions.margin.openPosition);
const closePosition = createReducer(actions.margin.closePosition);

const reducer: Reducer<State> = combineReducers({
  allowance,
  trading,
  openPosition,
  closePosition,
});

export default reducer;
