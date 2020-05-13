import React, { useLayoutEffect } from 'react';
import { createSelector } from 'reselect';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useApp, { useAppSelector, AppState } from '../../store/useApp';
import useOracle from '../../store/useOracle';
import { SwitchChain } from '../../components';
import { compareHash, toPrecision } from '../../utils';

const PolkadotOracleFeed: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const setOracleValues = useOracle(state => state.setOracleValues);

  useLayoutEffect(() => {
    if (currentApi?.currencies?.oracleValues) {
      const s = currentApi.currencies.oracleValues().subscribe((data: any) => {
        setOracleValues(
          data.concat({
            tokenId: 'AUSD',
            timestamp: null,
            value: toPrecision(1).toString(),
          }),
        );
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
    return (tokenAddress: string) => tokens.find(({ address }) => compareHash(address, tokenAddress)) || null;
  },
);

const useGetTokenInfoSelector = () => useAppSelector(getTokenInfoSelector);

const EthereumOracleFeed: React.FC = () => {
  const { data } = useSubscription(OracelQuery);
  const setOracleValues = useOracle(state => state.setOracleValues);
  const getToken = useGetTokenInfoSelector();

  useLayoutEffect(() => {
    if (data?.priceEntities) {
      const result = data.priceEntities
        .map(({ id, updatedAt, value }: any) => {
          return {
            tokenId: id,
            timestamp: updatedAt,
            value: toPrecision(value).toString(),
          };
        })
        .filter((x: any) => x);

      setOracleValues(
        result.concat({
          tokenId: '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99',
          timestamp: null,
          value: toPrecision(1).toString(),
        }),
      );
    }
  }, [data, getToken, setOracleValues]);

  return null;
};

export default () => {
  return <SwitchChain renderEthereum={() => <EthereumOracleFeed />} renderLaminar={() => <PolkadotOracleFeed />} />;
};
