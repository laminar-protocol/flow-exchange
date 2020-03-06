import { SubscriptionHookOptions, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useMemo } from 'react';

import { tokens } from '../_app/config';
import { useApp } from '../hooks/useApp';
import { TokenInfo } from '../services/Api';

interface QueryResult {
  priceEntities?: PriceData[];
}

const query = gql`
  subscription priceEntities {
    priceEntities {
      id
      value
      updatedAt
    }
  }
`;

export const useOraclePrice = (options?: SubscriptionHookOptions<QueryResult, {}>) => useSubscription(query, options);

export const useEthereumPriceRate = (
  fromSymbol?: TokenInfo,
  toSymbol?: TokenInfo,
  options?: SubscriptionHookOptions<QueryResult, {}>,
) => {
  const { loading, error, data } = useOraclePrice(options);

  const rate = useMemo(() => {
    if (!fromSymbol || !toSymbol) return;

    if (fromSymbol.name === toSymbol.name) {
      return 1;
    }

    if (data?.priceEntities) {
      const fromAddress = fromSymbol.address?.toLocaleLowerCase();
      const toAddress = toSymbol.address?.toLocaleLowerCase();

      let fromRate = 1;
      let toRate = 1;
      for (const price of data.priceEntities) {
        if (price.id === fromAddress) {
          fromRate = price.value;
        }
        if (price.id === toAddress) {
          toRate = price.value;
        }
      }
      return fromRate / toRate;
    }
  }, [data, fromSymbol, toSymbol]);

  return {
    loading,
    error,
    data: rate,
  };
};

export const usePriceRate = (
  fromSymbol: TokenSymbol,
  toSymbol: TokenSymbol,
  options?: SubscriptionHookOptions<QueryResult, {}>,
) => {
  const { loading, error, data } = useOraclePrice(options);

  const rate = useMemo(() => {
    if (fromSymbol === toSymbol) {
      return 1;
    }

    if (data?.priceEntities) {
      const fromAddress = tokens[fromSymbol].address?.toLocaleLowerCase();
      const toAddress = tokens[toSymbol].address?.toLocaleLowerCase();
      let fromRate = 1;
      let toRate = 1;
      for (const price of data.priceEntities) {
        if (price.id === fromAddress) {
          fromRate = price.value;
        }
        if (price.id === toAddress) {
          toRate = price.value;
        }
      }
      return fromRate / toRate;
    }
    return undefined;
  }, [data, fromSymbol, toSymbol]);

  return {
    loading,
    error,
    data: rate,
  };
};
