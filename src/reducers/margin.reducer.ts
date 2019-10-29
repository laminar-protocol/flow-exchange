import { combineReducers } from 'redux';
import { DeepReadonly } from 'utility-types';
import { State as ApiLoadableState, createReducer } from 'helpers/apiLoadable';
import { actions } from 'types';

export type State = DeepReadonly<{
  allowance: ApiLoadableState<string>;
  trading: ApiLoadableState<string>;
}>;

const allowance = createReducer(actions.margin.allowance);
const trading = createReducer(actions.margin.toggleTrading);

const reducer = combineReducers({
  allowance,
  trading,
});

export default reducer;
