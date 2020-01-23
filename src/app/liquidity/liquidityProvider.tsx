import React from 'react';
import styled from 'styled-components';
import { Text, FormatBalance, Spinner } from 'components';
import { useSelector } from 'react-redux';
import selectors from 'selectors';
import * as theme from 'theme';
import { TradingSymbol, Pool } from 'config';
import Spread from './spread';

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

  .ant-spin {
    margin: 2px;
  }
`;

const LiquidityProvider: React.FC<{ pool: Pool; tradingSymbol?: TradingSymbol }> = ({ pool, tradingSymbol }) => {
  const liquidity = useSelector(selectors.liquidityPool.liquidity(pool.address));
  const allowedTokens = useSelector(selectors.liquidityPool.allowedTokens(pool.address));
  return (
    <Provider key={pool.key}>
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
        {liquidity && !liquidity.loading ? (
          <div>
            <Text size="l">
              <FormatBalance value={liquidity.value} options={{ currencySymbol: '$', output: 'currency' }} />
            </Text>
          </div>
        ) : (
          <Spinner loading />
        )}
      </Item>
      {tradingSymbol ? (
        <Spread poolAddr={pool.address} tradingSymbol={tradingSymbol} />
      ) : (
        <Item>
          <div>
            <Text size="s" light>
              Market
            </Text>
          </div>
          {allowedTokens && !allowedTokens.loading ? (
            <div>
              <Text size="l">{allowedTokens.value && allowedTokens.value.join(', ')}</Text>
            </div>
          ) : (
            <Spinner loading />
          )}
        </Item>
      )}
    </Provider>
  );
};

export default LiquidityProvider;
