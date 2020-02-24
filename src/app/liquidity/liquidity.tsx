import {
  Flex,
  Notice,
  Panel,
  PrimaryButton,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  Text,
} from 'components';
import { tradingSymbols } from 'config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'selectors';
import styled from 'styled-components';
import { actions } from 'types';

import Layout from '../../pages/Layout';
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
    <Layout>
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
    </Layout>
  );
};

export default Liquidity;
