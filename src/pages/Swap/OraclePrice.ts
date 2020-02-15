import React, { useCallback, useEffect } from 'react';

import { useApp, useEthereumPriceRate } from '../../hooks';
import { Token } from '../../types';

type OraclePriceProps = {
  fromToken: Token;
  toToken: Token;
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
  const api = useApp(state => state.provider?.api);

  const getRate = useCallback(async () => {
    if (api) {
      set({ loading: true });
      const a = await api.getOrcalePrice(fromToken.name);
      const b = await api.getOrcalePrice(toToken.name);
      set({
        data: Number(a.toString(10)) / Number(b.toString(10)),
        loading: false,
      });
    }
  }, [fromToken, toToken, api, set]);

  useEffect(() => {
    getRate();
  }, [getRate]);

  return null;
};
