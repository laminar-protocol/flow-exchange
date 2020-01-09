import React from 'react';
import styled from 'styled-components';

import { Text, Separator, Panel, PrimaryButton, Flex, Notice } from 'components';
import * as theme from 'theme';

const Container = styled.div``;

const Provider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

const Component = () => (
  <Container>
    <p>
      <Text size="h">Liquidity</Text>
    </p>
    <Notice weight="bold">Under Development | Demo Page</Notice>
    <Separator />
    <Panel>
      <Provider>
        <Item>
          <Text size="l" weight="bold">
            Laminar Finance
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Volume
            </Text>
          </div>
          <div>
            <Text size="l">$500,000</Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              Liquidity Available
            </Text>
          </div>
          <div>
            <Text size="l">$10,000,000</Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              Market
            </Text>
          </div>
          <div>
            <Text size="l">EUR, JPY</Text>
          </div>
        </Item>
      </Provider>
      <Separator />
      <Provider>
        <Item>
          <Text size="l" weight="bold">
            ACME
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Volume
            </Text>
          </div>
          <div>
            <Text size="l">$200,000</Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              Liquidity Available
            </Text>
          </div>
          <div>
            <Text size="l">$5,000,000</Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              Market
            </Text>
          </div>
          <div>
            <Text size="l">XAU</Text>
          </div>
        </Item>
      </Provider>
    </Panel>
    <Separator />
    <Action>
      <PrimaryButton disabled>Provide Liquidity</PrimaryButton>
    </Action>
  </Container>
);

export default Component;
