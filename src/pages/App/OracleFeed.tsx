import React, { useLayoutEffect } from 'react';
import { createSelector } from 'reselect';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useApp, { useAppSelector, AppState } from '../../store/useApp';
import useOracle from '../../store/useOracle';
import { SwitchChain } from '../../components';
import { compareHash } from '../../utils';

const PolkadotOracleFeed: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const setOracleValues = useOracle(state => state.setOracleValues);

  useLayoutEffect(() => {
    if (currentApi?.currencies?.oracleValues) {
      const s = currentApi.currencies.oracleValues().subscribe((data: any) => {
        setOracleValues(data);
      });

      return () => s && s.unsubscribe();
    }
  }, [currentApi, setOracleValues]);

  return null;
};

const OracelQuery = gql`
  subscription priceEntities {
    priceEntities {
      id
      value
      updatedAt
    }
  }
`;

const getTokenInfoSelector = createSelector(
  (state: AppState) => state.tokens,
  tokens => {
    console.log(tokens);
    return (tokenAddress: string) => tokens.find(({ address }) => compareHash(address, tokenAddress)) || null;
  },
);

const EthereumOracleFeed: React.FC = () => {
  const { data } = useSubscription(OracelQuery);
  const setOracleValues = useOracle(state => state.setOracleValues);
  const getToken = useAppSelector(getTokenInfoSelector);

  useLayoutEffect(() => {
    if (data?.priceEntities) {
      const result = data.priceEntities
        .map(({ id, updateAt, value }: any) => {
          const token = getToken(id);
          console.log(id);
          if (!token) return null;
          return {
            id: token.id,
            timestamp: updateAt,
            value,
          };
        })
        .filter((x: any) => x);
      console.log(result);
      setOracleValues(result);
    }
  }, [data, getToken]);

  return null;
};

export default () => {
  return <SwitchChain renderEthereum={() => <EthereumOracleFeed />} renderLaminar={() => <PolkadotOracleFeed />} />;
};
