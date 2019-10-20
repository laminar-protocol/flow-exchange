import types from 'types';
import validate from 'validate.js';

const INITIAL_STATE = {
  fromSymbol: 'dai',
  toSymbol: 'eur',
  fromAmount: 0,
  toAmount: 0,

  rate: {},

  isSwapping: false,
  isValid: true,
  validationErrors: {},
};

const parseRate = (rate, fromSymbol, toSymbol) => {
  const { symbol } = rate;
  if ((fromSymbol === symbol) || (toSymbol === symbol)) {
    return { rate };
  }
  return null;
};

const valdiationResult = (state) => {
  const {
    fromAmount,
    toAmount,
  } = state;
  const attributes = { fromAmount, toAmount };
  const constraints = {
    fromAmount: {
      presence: true,
      numericality: {
        greaterThan: 0,
      },
    },
    toAmount: {
      presence: {
        allowEmpty: true,
      },
      numericality: {
        greaterThanOrEqualTo: 0,
      },
    },
  };
  const result = validate(attributes, constraints);
  if (result) {
    return {
      isValid: false,
      validationErrors: result,
    };
  }
  return {
    isValid: true,
    validationErrors: {},
  };
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

    case types.swapValidation.changed:
      return {
        ...state,
        ...valdiationResult(state),
      };

    case types.spotRate.completed:
      return {
        ...state,
        ...parseRate(payload, state.fromSymbol, state.toSymbol),
      };

    default:
      return state;
  }
};

export default reducer;
