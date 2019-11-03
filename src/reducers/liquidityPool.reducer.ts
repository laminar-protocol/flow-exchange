import { combineReducers, Reducer } from 'redux';
import { DeepReadonly } from 'utility-types';
import { MultiState as ApiLoadableState, createReducer } from 'helpers/apiLoadable';
import { actions } from 'types';

type _State = {
  spread: ApiLoadableState<{ ask: number; bid: number }, [string, string]>;
};

export type State = DeepReadonly<_State>;

const spread = createReducer(actions.liquidityPool.spread);

const reducer: Reducer<_State> = combineReducers({
  spread,
});

export default reducer;
