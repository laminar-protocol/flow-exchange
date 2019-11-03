import validate from 'validate.js';
import { isEmpty } from 'ramda';

import types from 'types';
import { fromWei } from 'helpers/unitHelper';


const INITIAL_STATE = {
  fromSymbol: 'DAI',
  toSymbol: 'fEUR',
  fromAmount: 0,
  toAmount: 0,

  rate: {},
  isRedeem: false,

  isSwapping: false,
  isValid: true,
  validationErrors: {},
};

export const caculateRate = (rate: any, isRedeem: boolean) => {
  if (isEmpty(rate)) {
    return undefined;
  }
  if (isRedeem) {
    return 1 / Number(fromWei(rate.bidPrice));
  }
  return 1 / Number(fromWei(rate.askPrice));
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
        isRedeem: payload !== 'DAI', // TODO: improve this
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
