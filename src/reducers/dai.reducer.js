import types from 'types';

const INITIAL_STATE = {
  balance: 0,
  isQueryingBalance: false,
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

    default:
      return state;
  }
};

export default reducer;
