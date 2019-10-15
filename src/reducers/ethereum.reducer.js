import types from 'types';

const INITIAL_STATE = {
  account: null,
  network: null,
  type: null,
  provider: null,
  isConnecting: false,
  isConnected: false,
  isConnectModalActive: false,
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ethereumModalOpen.changed:
      return {
        ...state,
        isConnectModalActive: true,
      };
    case types.ethereumModalClose.changed:
      return {
        ...state,
        isConnectModalActive: false,
      };
    case types.ethereumEnable.requested:
      return {
        ...state,
        isConnecting: true,
      };
    case types.ethereumEnable.failed:
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
        account: null,
      };
    case types.ethereumEnable.completed:
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        account: payload,
      };

    case types.ethereumNetwork.completed:
      return {
        ...state,
        network: payload,
      };
    default:
      return state;
  }
};

export default reducer;
