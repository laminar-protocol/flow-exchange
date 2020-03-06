import { network } from '_app/config';
import types from 'types';

import EthereumApi from '../../services/_EthereumApi';

const INITIAL_STATE = {
  api: new EthereumApi(),
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
    case types.provider.modalOpen.changed:
      return {
        ...state,
        isConnectModalActive: true,
      };
    case types.provider.modalClose.changed:
      return {
        ...state,
        isConnectModalActive: false,
      };

    case types.provider.enable.requested:
      return {
        ...state,
        isEnabling: true,
      };
    case types.provider.enable.failed:
      return {
        ...state,
        isEnabling: false,
        isEnabled: false,
        account: null,
      };
    case types.provider.enable.completed:
      return {
        ...state,
        isEnabling: false,
        isEnabled: true,
        account: payload,
      };

    case types.provider.network.requested:
      return {
        ...state,
        isConnecting: true,
      };
    case types.provider.network.failed:
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
      };

    case types.provider.network.completed: {
      const networkInfo = parseNetwork(payload);
      return {
        ...state,
        ...networkInfo,
        isConnecting: false,
        isConnected: true,
        isNetworkGuardModalActive: networkInfo.network && networkInfo.network !== network,
      };
    }

    case types.provider.account.changed:
      return {
        ...state,
        account: payload,
      };
    default:
      return state;
  }
};

export default reducer;
