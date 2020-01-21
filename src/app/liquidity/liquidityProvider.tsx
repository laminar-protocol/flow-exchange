import React from 'react';
import styled from 'styled-components';
import { Text, FormatBalance, Spinner } from 'components';
import { useSelector } from 'react-redux';
import selectors from 'selectors';
import * as theme from 'theme';

const Provider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  ::after {
    content: '';
    width: 100%;
    height: 1px;
    background: ${theme.separatorColor};
    margin: 2rem 0;
  }
  :last-child::after {
    content: none;
  }
`;

const Item = styled.div`
  width: 25%;
  ${theme.respondTo.lg`
  width: 50%;
`}

  div {
    margin: 0.5rem 0;
  }
`;

const LiquidityProvider = ({ pool }: { pool: any }) => {
  const liquidity = useSelector(selectors.liquidityPool.liquidity(pool.address));
  const allowedTokens = useSelector(selectors.liquidityPool.allowedTokens(pool.address));
  return (
    <Provider key={pool.poolId}>
      <Item>
        <Text size="l" weight="bold">
          {pool.name}
        </Text>
      </Item>
      <Item>
        <div>
          <Text size="s" light>
            Volume
          </Text>
        </div>
        <div>
          <Text size="l">-</Text>
        </div>
      </Item>

      <Item>
        <div>
          <Text size="s" light>
            Liquidity Available
          </Text>
        </div>
        <div>
          {liquidity && !liquidity.loading ? (
            <Text size="l">
              <FormatBalance value={liquidity.value} options={{ currencySymbol: '$', output: 'currency' }} />
            </Text>
          ) : (
            <Spinner loading />
          )}
        </div>
      </Item>

      <Item>
        <div>
          <Text size="s" light>
            Market
          </Text>
        </div>
        <div>
          <Text size="l">
            {allowedTokens && !allowedTokens.loading ? (
              <Text size="l">{allowedTokens.value && allowedTokens.value.join(', ')}</Text>
            ) : (
              <Spinner loading />
            )}
          </Text>
        </div>
      </Item>
    </Provider>
  );
};

export default LiquidityProvider;
