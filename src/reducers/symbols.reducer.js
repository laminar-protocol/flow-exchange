import types from 'types';

const INITIAL_STATE = {
  symbols: [],
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.symbols.changed:
      return {
        ...state,
        symbols: payload,
      };

    default:
      return state;
  }
};

export default reducer;
