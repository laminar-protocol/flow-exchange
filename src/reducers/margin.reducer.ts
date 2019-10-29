import { combineReducers } from 'redux';
import { DeepReadonly } from 'utility-types';
import { State as ApiLoadableState, createReducer } from 'helpers/apiLoadable';
import { actions } from 'types';

export type State = DeepReadonly<{
  allowance: ApiLoadableState<string>;
}>;

const allowance = createReducer(actions.margin.allowance);

const reducer = combineReducers({
  allowance,
});

export default reducer;
