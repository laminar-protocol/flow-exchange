import types from 'types';

const INITIAL_STATE = {
  balance: '0',
  authorizationAmount: '0',
  isQueryingBalance: false,
  isQueryingAuthorization: false,
  isGranting: false,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.jpyBalance.requested:
      return {
        ...state,
        isQueryingBalance: true,
      };
    case types.jpyBalance.failed:
      return {
        ...state,
        isQueryingBalance: false,
      };
    case types.jpyBalance.completed:
      return {
        ...state,
        balance: payload,
        isQueryingBalance: false,
      };

    case types.jpyAuthorization.requested:
      return {
        ...state,
        isQueryingAuthorization: true,
      };
    case types.jpyAuthorization.failed:
      return {
        ...state,
        isQueryingAuthorization: false,
      };
    case types.jpyAuthorization.completed:
      return {
        ...state,
        authorizationAmount: payload,
        isQueryingAuthorization: false,
      };

    case types.jpyGrant.requested:
      return {
        ...state,
        isGranting: true,
      };
    case types.jpyGrant.failed:
      return {
        ...state,
        isGranting: false,
      };
    case types.jpyGrant.completed:
      return {
        ...state,
        isGranting: false,
      };

    default:
      return state;
  }
};

export default reducer;
