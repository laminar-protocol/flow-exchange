import React from 'react';
import styled from 'styled-components';

import { Text, Separator, Panel, SolidButton } from 'components';
import * as theme from 'theme';

const Container = styled.div`
`;

const Development = styled(Text)`
  background-color: ${theme.noticeForegroundColor};
  color: ${theme.alwaysWhiteForegroundColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-transform: uppercase;
`;

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

const Component = () => (
  <Container>
    <p>
      <Text size="h">Borrow &amp; Lending</Text>
    </p>
    <Development weight="bold">Under Development | Demo Page</Development>
    <Separator />
    <Panel>
      <Provider>
        <Item>
          <Text size="l" weight="bold">
            EUR
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Market Size
            </Text>
          </div>
          <div>
            <Text size="l">
              $500,000
            </Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              APR
            </Text>
          </div>
          <div>
            <Text size="l">
              3%
            </Text>
          </div>
        </Item>

        <Item>
          <SolidButton>Lend</SolidButton>
          &nbsp;
          <SolidButton>Borrow</SolidButton>
        </Item>
      </Provider>
      <Separator />
      <Provider>
        <Item>
          <Text size="l" weight="bold">
            JPY
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Market Size
            </Text>
          </div>
          <div>
            <Text size="l">
              $200,000
            </Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              APR
            </Text>
          </div>
          <div>
            <Text size="l">
              3%
            </Text>
          </div>
        </Item>

        <Item>
          <SolidButton>Lend</SolidButton>
          &nbsp;
          <SolidButton>Borrow</SolidButton>
        </Item>
      </Provider>
      <Separator />
      <Provider>
        <Item>
          <Text size="l" weight="bold">
            XAU
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Market Size
            </Text>
          </div>
          <div>
            <Text size="l">
              $200,000
            </Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              APR
            </Text>
          </div>
          <div>
            <Text size="l">
              3%
            </Text>
          </div>
        </Item>

        <Item>
          <SolidButton>Lend</SolidButton>
          &nbsp;
          <SolidButton>Borrow</SolidButton>
        </Item>
      </Provider>
      <Separator />
      <Provider>
        <Item>
          <Text size="l" weight="bold">
            AAPL
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Market Size
            </Text>
          </div>
          <div>
            <Text size="l">
              $200,000
            </Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              APR
            </Text>
          </div>
          <div>
            <Text size="l">
              3%
            </Text>
          </div>
        </Item>

        <Item>
          <SolidButton>Lend</SolidButton>
          &nbsp;
          <SolidButton>Borrow</SolidButton>
        </Item>
      </Provider>
    </Panel>
  </Container>
);

export default Component;
