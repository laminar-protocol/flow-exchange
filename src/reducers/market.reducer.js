import types from 'types';

const INITIAL_STATE = {
  symbols: {},
};

export const getSymbols = (symbols) => {
  if (!symbols) {
    return [];
  }
  return Object.keys(symbols).map((key) => ({
    symbol: key,
    ...symbols[key],
  }));
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.marketSymbols.changed:
      return {
        ...state,
        symbols: payload,
      };

    default:
      return state;
  }
};

export default reducer;
