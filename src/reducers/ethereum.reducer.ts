import { network } from 'config';
import types from 'types';

const INITIAL_STATE = {
  account: null,
  network,

  isTestnet: true, // TODO: replace with config

  isEnabling: false,
  isConnecting: false,

  isEnabled: false,
  isConnected: false,

  isConnectModalActive: false,
  isNetworkGuardModalActive: false,
};

const parseNetwork = (payload: { network: Network }) => ({
  network: payload.network,
  isTestnet: payload.network !== 'mainnet',
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

    case types.ethereum.network.completed: {
      const networkInfo = parseNetwork(payload);
      return {
        ...state,
        ...networkInfo,
        isConnecting: false,
        isConnected: true,
        isNetworkGuardModalActive: networkInfo.network && networkInfo.network !== network,
      };
    }

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
