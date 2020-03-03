import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Amount, Panel, Separator, Text } from '../../components';
import { getTokenInfoMap, useApp } from '../../hooks/useApp';
import { getPoolOptions, usePools } from '../../hooks/usePools';
import { theme } from '../../styles';
import { calcTokenLiquidity } from '../../utils';
import Layout from '../Layout';

const Deposit = () => {
  const allTokens = useApp(getTokenInfoMap);
  const pool = usePools(state => state.defaultPool);
  const initPool = usePools(state => state.initPool);
  const liquidity = usePools(state => (pool ? state.poolLiquidity[pool.id] : null));
  const options = usePools(getPoolOptions);
  const tokens = useMemo(() => Object.keys(options), [options]);

  useEffect(() => {
    if (pool) {
      initPool(pool.id);
    }
  }, [pool]);

  return (
    <Layout>
      <Container>
        <p>
          <Text size="h">Deposit &amp; Earn</Text>
        </p>
        <Separator />
        <Panel>
          {tokens.map(tokenId => {
            const token = allTokens[tokenId];

            return (
              <div className="provider" key={token.name}>
                <div className="item">
                  <Text size="l" weight="bold">
                    {token.name}
                  </Text>
                </div>
                <div className="item">
                  <div>
                    <Text size="s" light>
                      Market Size
                    </Text>
                  </div>
                  <div>
                    <Text size="l">
                      {liquidity && options && (
                        <Amount
                          value={calcTokenLiquidity(liquidity, options[token.id].additionalCollateralRatio || 0)}
                          token={token}
                          hasPrefix
                        />
                      )}
                    </Text>
                  </div>
                </div>

                <div className="item">
                  <div>
                    <Text size="s" light>
                      APR
                    </Text>
                  </div>
                  <div>
                    <Text size="l">3%</Text>
                  </div>
                </div>
              </div>
            );
          })}
        </Panel>
      </Container>
    </Layout>
  );
};

const Container = styled('div')`
  .provider {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px #e6e6eb solid;
    padding-bottom: 2rem;
    padding-top: 2rem;
    &:last-child {
      border-bottom: none;
    }
  }

  .item {
    width: 25%;
    ${theme.respondTo.lg`
      width: 50%;
    `}

    div {
      margin: 0.5rem 0;
    }
  }
`;

export default Deposit;
