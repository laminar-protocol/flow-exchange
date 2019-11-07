import validate from 'validate.js';

import types from 'types';

const INITIAL_STATE = {
  fromSymbol: 'DAI',
  toSymbol: 'fEUR',
  fromAmount: null,
  toAmount: null,

  isSwapping: false,
  isValid: true,
  validationErrors: {},
};

const valdiationResult = (state: any) => {
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

const reducer = (state = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case types.swap.fromSymbol.changed:
      return {
        ...state,
        rate: {},
        fromSymbol: payload,
      };
    case types.swap.toSymbol.changed:
      return {
        ...state,
        rate: {},
        toSymbol: payload,
      };
    case types.swap.fromAmount.changed:
      return {
        ...state,
        fromAmount: payload,
      };
    case types.swap.toAmount.changed:
      return {
        ...state,
        toAmount: payload,
      };

    case types.swap.mint.requested:
    case types.swap.redeem.requested:
      return {
        ...state,
        isSwapping: true,
      };

    case types.swap.mint.failed:
    case types.swap.redeem.failed:
      return {
        ...state,
        isSwapping: false,
      };

    case types.swap.mint.completed:
    case types.swap.redeem.completed:
      return {
        ...state,
        isSwapping: false,
      };

    case types.swap.validation.changed:
      return {
        ...state,
        ...valdiationResult(state),
      };

    default:
      return state;
  }
};

export default reducer;
