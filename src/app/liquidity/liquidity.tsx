import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

import { Text, Separator, Panel, PrimaryButton, Flex, Notice, FormatBalance, Spinner } from 'components';
import * as theme from 'theme';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import { actions } from '../../types';

const Container = styled.div``;

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

const Action = styled(Flex)`
  justify-content: flex-end;
`;

const Liquidity: React.FC = () => {
  const dispatch = useDispatch();

  const pools = useSelector<AppState, any>(state => state.liquidityPool.pools);
  const poolAvailables = useSelector<AppState, any>(state => state.liquidityPool.availables);
  const allowedTokens = useSelector<AppState, any>(state => state.liquidityPool.allowed_tokens);

  useLayoutEffect(() => {
    for (const poolId of pools.allIds) {
      dispatch(actions.liquidityPool.available.requested({ id: pools.byId[poolId].address }));
      dispatch(actions.liquidityPool.allowed_tokens.requested({ id: pools.byId[poolId].address }));
    }
  }, [dispatch, ...pools.allIds]);

  return (
    <Container>
      <p>
        <Text size="h">Liquidity</Text>
      </p>
      <Notice weight="bold">Under Development | Demo Page</Notice>
      <Separator />
      <Panel>
        {pools.allIds.map((poolId: string) => {
          const poolAvailability = poolAvailables.states[pools.byId[poolId].address];
          const allowed = allowedTokens.states[pools.byId[poolId].address] || [];
          return (
            <Provider>
              <Item>
                <Text size="l" weight="bold">
                  {pools.byId[poolId].name}
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
                  {poolAvailability && !poolAvailability.loading ? (
                    <Text size="l">
                      <FormatBalance
                        value={poolAvailability.value}
                        options={{ currencySymbol: '$', output: 'currency' }}
                      />
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
                    {allowed && !allowed.loading ? (
                      <Text size="l">{allowed.value && allowed.value.join(', ')}</Text>
                    ) : (
                      <Spinner loading />
                    )}
                  </Text>
                </div>
              </Item>
            </Provider>
          );
        })}
      </Panel>
      <Separator />
      <Action>
        <PrimaryButton disabled>Provide Liquidity</PrimaryButton>
      </Action>
    </Container>
  );
};

export default Liquidity;
