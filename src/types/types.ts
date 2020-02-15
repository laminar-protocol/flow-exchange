import { IconProp } from '../components/icon';
import { EthereumApi, PolkadotApi } from '../services';

export interface Account {
  address: string;
}

export type Token = {
  name: string;
  displayName: string;
  precision: number;
  currencySymbol: string;
  icon: IconProp;
  isBaseToken: boolean;
  isNetworkToken: boolean;
  id: string;
};

export type Pool = {
  id: string;
  name: string;
  address: string;
};

export type CurrencyData = {
  additionalCollateralRatio: number | null;
  bidSpread: number | null;
  askSpread: number | null;
  enabled: number | null;
};

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
