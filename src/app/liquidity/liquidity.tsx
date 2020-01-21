import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text, Separator, Panel, PrimaryButton, Flex, Notice } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'types';
import selectors from 'selectors';
import LiquidityProvider from './liquidityProvider';

const Container = styled.div``;

const Action = styled(Flex)`
  justify-content: flex-end;
`;

const Liquidity: React.FC = () => {
  const dispatch = useDispatch();

  const pools = useSelector(selectors.liquidityPool.pools);

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
        {pools.map((pool: any) => (
          <LiquidityProvider pool={pool} />
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
