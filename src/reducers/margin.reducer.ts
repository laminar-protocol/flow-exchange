import { combineReducers } from 'redux';
import { DeepReadonly } from 'utility-types';
import { State as ApiLoadableState, createReducer } from 'helpers/apiLoadable';
import types from 'types';

export type State = DeepReadonly<{
  isEnabled: ApiLoadableState<boolean>;
}>;

const isEnabled = createReducer<boolean>(types.margin.enabled);

const reducer = combineReducers({
  isEnabled,
});

export default reducer;
