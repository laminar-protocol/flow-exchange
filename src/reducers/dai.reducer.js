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
    case types.daiBalance.requested:
      return {
        ...state,
        isQueryingBalance: true,
      };
    case types.daiBalance.failed:
      return {
        ...state,
        isQueryingBalance: false,
      };
    case types.daiBalance.completed:
      return {
        ...state,
        balance: payload,
        isQueryingBalance: false,
      };

    case types.daiAuthorization.requested:
      return {
        ...state,
        isQueryingAuthorization: true,
      };
    case types.daiAuthorization.failed:
      return {
        ...state,
        isQueryingAuthorization: false,
      };
    case types.daiAuthorization.completed:
      return {
        ...state,
        authorizationAmount: payload,
        isQueryingAuthorization: false,
      };

    case types.daiGrant.requested:
      return {
        ...state,
        isGranting: true,
      };
    case types.daiGrant.failed:
      return {
        ...state,
        isGranting: false,
      };
    case types.daiGrant.completed:
      return {
        ...state,
        isGranting: false,
      };

    default:
      return state;
  }
};

export default reducer;
