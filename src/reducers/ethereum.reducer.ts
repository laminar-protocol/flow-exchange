import types from 'types';

const INITIAL_STATE = {
  account: null,
  network: null,

  isTestnet: true, // TODO: replace with config

  isEnabling: false,
  isConnecting: false,

  isEnabled: false,
  isConnected: false,

  isConnectModalActive: false,
};

const parseNetwork = (payload: any) => ({
  network: payload.network,
  isTestnet: (payload.network !== 'main'),
});

const reducer = (state = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case types.ethereum.modalOpen.changed:
      return {
        ...state,
        isConnectModalActive: true,
      };
    case types.ethereum.modalClose.changed:
      return {
        ...state,
        isConnectModalActive: false,
      };

    case types.ethereum.enable.requested:
      return {
        ...state,
        isEnabling: true,
      };
    case types.ethereum.enable.failed:
      return {
        ...state,
        isEnabling: false,
        isEnabled: false,
        account: null,
      };
    case types.ethereum.enable.completed:
      return {
        ...state,
        isEnabling: false,
        isEnabled: true,
        account: payload,
      };

    case types.ethereum.network.requested:
      return {
        ...state,
        isConnecting: true,
      };
    case types.ethereum.network.failed:
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
      };

    case types.ethereum.network.completed:
      return {
        ...state,
        ...parseNetwork(payload),
        isConnecting: false,
        isConnected: true,
      };
    case types.ethereum.account.changed:
      return {
        ...state,
        account: payload,
      };
    default:
      return state;
  }
};

export default reducer;
