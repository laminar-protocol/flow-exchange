import types from 'types';

const INITIAL_STATE = {
  moneyMarket: null,
  oracle: null,
  isQueryingMoneyMarket: false,
  isQueryingOracle: false,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.flowMoneyMarket.requested:
      return {
        ...state,
        isQueryingMoneyMarket: true,
      };
    case types.flowMoneyMarket.failed:
      return {
        ...state,
        isQueryingMoneyMarket: false,
      };
    case types.flowMoneyMarket.completed:
      return {
        ...state,
        moneyMarket: payload,
        isQueryingMoneyMarket: false,
      };

    case types.flowOracle.requested:
      return {
        ...state,
        isQueryingOracle: true,
      };
    case types.flowOracle.failed:
      return {
        ...state,
        isQueryingOracle: false,
      };
    case types.flowOracle.completed:
      return {
        ...state,
        oracle: payload,
        isQueryingOracle: false,
      };

    default:
      return state;
  }
};

export default reducer;
