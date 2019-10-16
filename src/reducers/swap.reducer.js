import types from 'types';

const INITIAL_STATE = {
  fromSymbol: 'dai',
  toSymbol: 'eur',
  fromAmount: 0,
  toAmount: 0,
  isSwapping: false,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.swapFromSymbol.changed:
      return {
        ...state,
        fromSymbol: payload,
      };
    case types.swapToSymbol.changed:
      return {
        ...state,
        toSymbol: payload,
      };
    case types.swapFromAmount.changed:
      return {
        ...state,
        fromAmount: payload,
      };
    case types.swapToAmount.changed:
      return {
        ...state,
        toAmount: payload,
      };

    case types.swap.requested:
      return {
        ...state,
        isSwapping: true,
      };
    case types.swap.failed:
      return {
        ...state,
        isSwapping: false,
      };
    case types.swap.completed:
      return {
        ...state,
        isSwapping: false,
      };
    default:
      return state;
  }
};

export default reducer;
