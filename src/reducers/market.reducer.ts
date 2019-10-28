import types from 'types';

const INITIAL_STATE = {
  symbols: {},
};

export const getSymbols = (symbols: string) => Object.values(symbols);

const reducer = (state = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case types.market.symbols.changed:
      return {
        ...state,
        symbols: payload,
      };

    default:
      return state;
  }
};

export default reducer;
