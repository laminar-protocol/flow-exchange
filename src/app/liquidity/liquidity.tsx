import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Text,
  Separator,
  Panel,
  PrimaryButton,
  Flex,
  Notice,
  SegmentedControl,
  SegmentedControlItem,
} from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'types';
import selectors from 'selectors';
import { tradingSymbols } from 'config';
import LiquidityProvider from './liquidityProvider';

const Container = styled.div``;

const Action = styled(Flex)`
  justify-content: flex-end;
`;

const FilterSymbol = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Liquidity: React.FC = () => {
  const dispatch = useDispatch();

  const pools = useSelector(selectors.liquidityPool.pools);

  const [filterMarket, setFilterMarket] = useState();

  useEffect(() => {
    pools.forEach((pool: any) => {
      dispatch(actions.liquidityPool.liquidity.requested({ id: pool.address }));
      dispatch(actions.liquidityPool.allowedTokens.requested({ id: pool.address }));
    });
  }, [dispatch, pools]);

  return (
    <Container>
      <p>
        <Text size="h">Liquidity</Text>
      </p>
      <Notice weight="bold">Under Development</Notice>
      <Separator />
      <Panel>
        <FilterSymbol>
          <SegmentedControl
            buttonStyle="solid"
            value={filterMarket}
            onChange={e => {
              setFilterMarket(e.target.value);
            }}
          >
            <SegmentedControlItem>Market</SegmentedControlItem>
            {Object.keys(tradingSymbols).map(symbol => (
              <SegmentedControlItem key={symbol} value={symbol}>
                {symbol}
              </SegmentedControlItem>
            ))}
          </SegmentedControl>
        </FilterSymbol>
        {pools.map((pool: any) => (
          <LiquidityProvider key={pool.address} pool={pool} tradingSymbol={filterMarket} />
        ))}
      </Panel>
      <Separator />
      <Action>
        <PrimaryButton disabled>Provide Liquidity</PrimaryButton>
      </Action>
    </Container>
  );
};

export default Liquidity;
