import types from 'types';

const INITIAL_STATE = {
  account: null,
  network: null,

  contracts: {},

  daiContract: null,
  flowContract: null,
  eurContract: null,
  jpyContract: null,
  poolContract: null,

  isTestnet: false,

  isConnecting: false,
  isConnected: false,
  isConnectModalActive: false,
};

const parseNetwork = (payload) => ({
  network: payload.network,
  isTestnet: (payload.network !== 'main'),
  daiContract: payload.addresses.dai,
  flowContract: payload.addresses.flow,
  eurContract: payload.addresses.eur,
  jpyContract: payload.addresses.jpy,
  poolContract: payload.addresses.fallbackPool,
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
        ...parseNetwork(payload),
      };
    default:
      return state;
  }
};

export default reducer;
