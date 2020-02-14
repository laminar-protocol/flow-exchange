import { IconProp } from '../components/icon';

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
