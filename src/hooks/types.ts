import { EthereumApi, PolkadotApi } from '../services';

export type Impl = 'ethereum' | 'polkadot';

export type EthereumProvider = {
  impl: 'ethereum';
  loading: boolean;
  api: EthereumApi;
};

export type PolkadotProvider = {
  impl: 'polkadot';
  loading: boolean;
  api: PolkadotApi;
};
