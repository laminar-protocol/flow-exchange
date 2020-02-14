import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as theme from 'theme';

import { Amount, Panel, Separator, Text } from '../../components';
import { useApp, usePools, useTokens } from '../../hooks';

const Deposit = () => {
  const api = useApp(state => state.provider?.api);
  const pool = usePools(state => state.defaultPool);
  const tokens = useTokens(state => state.currentTokens);
  const [liquidities, setLiquidities] = useState<Record<string, BN>>({});

  useEffect(() => {
    if (pool && api && tokens) {
      Promise.all(
        tokens.map(async token => ({
          token: token.name,
          liquidity: await api.getTokenLiquidity(pool, token.id),
        })),
      ).then(result => {
        setLiquidities(
          result.reduce((acc: any, curr) => {
            acc[curr.token] = curr.liquidity;
            return acc;
          }, {}),
        );
      });
    }
  }, [tokens, pool, api]);
  return (
    <Container>
      <p>
        <Text size="h">Deposit &amp; Earn</Text>
      </p>
      <Separator />
      <Panel>
        {tokens?.map(token => {
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
                    {liquidities[token.name] && <Amount value={liquidities[token.name]} token={token} hasPrefix />}
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
