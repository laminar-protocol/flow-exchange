import types from 'types';

const INITIAL_STATE = {
  balances: {},
  authorizations: {},
  isQueryingBalance: {},
  isQueryingAuthorization: {},
  isGranting: {},
};

export const getAuthorization = (symbol, state) => state.authorizations[symbol];
export const getBalance = (symbol, state) => state.balances[symbol];
export const getIsQueryingBalance = (symbol, state) => state.isQueryingBalance[symbol];
export const getIsQueryingAuthorization = (symbol, state) => state.isQueryingAuthorization[symbol];
export const getIsGranting = (symbol, state) => state.isGranting[symbol];


const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.tokenBalance.requested:
      return {
        ...state,
        isQueryingBalance: {
          ...state.isQueryingBalance,
          [payload.symbol]: true,
        },
      };
    case types.tokenBalance.failed:
      return {
        ...state,
        isQueryingBalance: {
          ...state.isQueryingBalance,
          [payload.symbol]: false,
        },
      };
    case types.tokenBalance.completed:
      return {
        ...state,
        balances: {
          ...state.balances,
          [payload.symbol]: payload.balance,
        },
        isQueryingBalance: {
          ...state.isQueryingBalance,
          [payload.symbol]: false,
        },
      };

    case types.tokenAuthorization.requested:
      return {
        ...state,
        isQueryingAuthorization: {
          ...state.isQueryingAuthorization,
          [payload.symbol]: true,
        },
      };
    case types.tokenAuthorization.failed:
      return {
        ...state,
        isQueryingAuthorization: {
          ...state.isQueryingAuthorization,
          [payload.symbol]: false,
        },
      };
    case types.tokenAuthorization.completed:
      return {
        ...state,
        authorizations: {
          ...state.authorizations,
          [payload.symbol]: payload.balance,
        },
        isQueryingAuthorization: {
          ...state.isQueryingAuthorization,
          [payload.symbol]: false,
        },
      };

    case types.tokenGrant.requested:
      return {
        ...state,
        isGranting: {
          ...state.isGranting,
          [payload.symbol]: true,
        },
      };
    case types.tokenGrant.failed:
      return {
        ...state,
        isGranting: {
          ...state.isGranting,
          [payload.symbol]: false,
        },
      };
    case types.tokenGrant.completed:
      return {
        ...state,
        isGranting: {
          ...state.isGranting,
          [payload.symbol]: false,
        },
      };

    default:
      return state;
  }
};

export default reducer;
