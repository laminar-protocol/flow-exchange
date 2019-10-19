import types from 'types';

const INITIAL_STATE = {
  account: null,
  network: null,

  contracts: {},

  isTestnet: false,

  isEnabling: false,
  isConnecting: false,

  isEnabled: false,
  isConnected: false,

  isConnectModalActive: false,
};

const parseNetwork = (payload) => ({
  network: payload.network,
  isTestnet: (payload.network !== 'main'),
  contracts: {
    dai: payload.addresses.dai,
    flow: payload.addresses.flow,
    eur: payload.addresses.eur,
    jpy: payload.addresses.jpy,
    pool: payload.addresses.fallbackPool,
  },
});

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
        isEnabling: true,
      };
    case types.ethereumEnable.failed:
      return {
        ...state,
        isEnabling: false,
        isEnabled: false,
        account: null,
      };
    case types.ethereumEnable.completed:
      return {
        ...state,
        isEnabling: false,
        isEnabled: true,
        account: payload,
      };

    case types.ethereumNetwork.requested:
      return {
        ...state,
        isConnecting: true,
      };
    case types.ethereumNetwork.failed:
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
      };

    case types.ethereumNetwork.completed:
      return {
        ...state,
        ...parseNetwork(payload),
        isConnecting: false,
        isConnected: true,
      };
    default:
      return state;
  }
};

export default reducer;
