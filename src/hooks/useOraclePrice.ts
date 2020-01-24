import gql from 'graphql-tag';
import { useSubscription, SubscriptionHookOptions } from '@apollo/react-hooks';
import { useMemo } from 'react';
import { tokens } from 'config';

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
      const fromAddress = tokens[fromSymbol].address.toLocaleLowerCase();
      const toAddress = tokens[toSymbol].address.toLocaleLowerCase();
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
