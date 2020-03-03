import React, { useCallback, useEffect } from 'react';

import { useApp, useEthereumPriceRate } from '../../hooks';
import { TokenInfo } from '../../services/Api';

type OraclePriceProps = {
  fromToken: TokenInfo;
  toToken: TokenInfo;
  set: (value: { loading: boolean; data?: number }) => void;
};

export const EthereumOraclePrice: React.FC<OraclePriceProps> = ({ set, fromToken, toToken }) => {
  const { data, loading } = useEthereumPriceRate(fromToken, toToken);

  useEffect(() => {
    set({ data, loading });
  }, [data, loading, set]);

  return null;
};

export const PolkadotOraclePrice: React.FC<OraclePriceProps> = ({ set, fromToken, toToken }) => {
  const api = useApp(state => state.api);

  const getRate = useCallback(async () => {
    if (api) {
      set({ loading: true });
      const a = await api.getOraclePrice(fromToken.id);
      const b = await api.getOraclePrice(toToken.id);
      set({
        data: Number(a.toString()) / Number(b.toString()),
        loading: false,
      });
    }
  }, [fromToken, toToken, api, set]);

  useEffect(() => {
    getRate();
  }, [getRate]);

  return null;
};
