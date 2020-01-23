import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, FormatBalance, Spinner } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'selectors';
import * as theme from 'theme';
import { usePriceRate } from 'hooks';
import { tradingSymbols, getQuoteTokenFromTradingSymbol, getTradingPairFromTradingSymbol } from 'config';
import _ from 'lodash';
import { calculateRate } from 'app/margin/rate';
import { actions } from 'types';

const Item = styled.div`
  width: 50%;
  div {
    margin: 0.5rem 0;
  }
  .ant-spin {
    margin: 2px;
  }
`;

const Container = styled.div`
  width: 25%;
  flex-direction: row;
  display: flex;
  ${theme.respondTo.lg`
  width: 50%;
`}
`;

const Spread: React.FC<{ poolAddr: string; tradingSymbol: TradingSymbol }> = ({ poolAddr, tradingSymbol }) => {
  const dispatch = useDispatch();

  const trading = _.get(tradingSymbols, tradingSymbol);
  const pair = getTradingPairFromTradingSymbol(tradingSymbol);
  const { address: tokenAddr } = getQuoteTokenFromTradingSymbol(tradingSymbol) || { address: '' };

  const quote = _.get(pair, 'quote', '') as TokenSymbol;
  const base = _.get(pair, 'base', '') as TokenSymbol;

  // get rate and spread
  const rate = usePriceRate(quote, base);
  const spread = useSelector(selectors.liquidityPool.spread(poolAddr, tokenAddr));

  // fetching rate or spread
  const loading = _.get(spread, 'loading', true) || _.get(rate, 'loading', true);

  useEffect(() => {
    dispatch(actions.liquidityPool.spread.requested({ id: [poolAddr, tokenAddr] }));
  }, [dispatch, poolAddr, tokenAddr]);

  return (
    <Container>
      <Item>
        <div>
          <Text size="s" light>
            Bid
          </Text>
        </div>
        {loading ? (
          <Spinner loading />
        ) : (
          <div>
            <Text size="l">
              <FormatBalance
                value={calculateRate(
                  _.get(spread, 'value.bid'),
                  trading.inverted,
                  'bid',
                  _.get(rate, 'data') || undefined,
                )}
                options={{ mantissa: trading.precision }}
              />
            </Text>
          </div>
        )}
      </Item>
      <Item>
        <div>
          <Text size="s" light>
            Ask
          </Text>
        </div>

        {loading ? (
          <Spinner loading />
        ) : (
          <div>
            <Text size="l">
              <FormatBalance
                value={calculateRate(
                  _.get(spread, 'value.ask'),
                  trading.inverted,
                  'ask',
                  _.get(rate, 'data') || undefined,
                )}
                options={{ mantissa: trading.precision }}
              />
            </Text>
          </div>
        )}
      </Item>
    </Container>
  );
};

export default Spread;
