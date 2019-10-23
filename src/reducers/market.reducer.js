import types from 'types';

const INITIAL_STATE = {
  symbols: {},
};

export const getSymbols = (symbols) => Object.values(symbols);

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
