import { DeepReadonly } from 'utility-types';

import ReducerBuilder from 'helpers/reducerBuilder';
import { actions } from 'types';

const INITIAL_STATE = {
  symbols: {} as Record<string, SymbolType>,
};

export type SymbolType = { symbol: string; name: string; isBaseToken: boolean };
export type State = DeepReadonly<typeof INITIAL_STATE>;

export const getSymbols = (symbols: Record<string, SymbolType>) => Object.values(symbols);
export const getSymbol = (symbol: string, state: State) => state.symbols[symbol];

const reducer = new ReducerBuilder<State>(INITIAL_STATE)
  .handle(actions.market.symbols.changed, (state, { payload: symbols }) => ({
    ...state,
    symbols: symbols || state.symbols,
  }))
  .build();

export default reducer;
