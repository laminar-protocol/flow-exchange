import { DeepReadonly } from 'utility-types';

import ReducerBuilder from 'helpers/reducerBuilder';
import { actions } from 'types';

const INITIAL_STATE = {
  symbols: {} as Record<string, { symbol: string; name: string }>,
};

export type State = DeepReadonly<typeof INITIAL_STATE>;

export const getSymbols = (symbols: string) => Object.values(symbols);

const reducer = new ReducerBuilder<State>(INITIAL_STATE)
  .handle(actions.market.symbols.changed, (state, { payload: symbols }) => ({
    ...state,
    symbols: symbols || state.symbols,
  }))
  .build();

export default reducer;
