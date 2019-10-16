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
    case types.eurBalance.requested:
      return {
        ...state,
        isQueryingBalance: true,
      };
    case types.eurBalance.failed:
      return {
        ...state,
        isQueryingBalance: false,
      };
    case types.eurBalance.completed:
      return {
        ...state,
        balance: payload,
        isQueryingBalance: false,
      };

    case types.eurAuthorization.requested:
      return {
        ...state,
        isQueryingAuthorization: true,
      };
    case types.eurAuthorization.failed:
      return {
        ...state,
        isQueryingAuthorization: false,
      };
    case types.eurAuthorization.completed:
      return {
        ...state,
        authorizationAmount: payload,
        isQueryingAuthorization: false,
      };

    case types.eurGrant.requested:
      return {
        ...state,
        isGranting: true,
      };
    case types.eurGrant.failed:
      return {
        ...state,
        isGranting: false,
      };
    case types.eurGrant.completed:
      return {
        ...state,
        isGranting: false,
      };

    default:
      return state;
  }
};

export default reducer;
