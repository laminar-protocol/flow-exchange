import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Text, Separator, Panel, Flex } from 'components';

import ChartTicker from 'app/chartWidget/chartTicker';
import * as theme from 'theme';

import Balance from './balance.connect';
import Faucet from './faucet.connect';

const Container = styled.div``;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${theme.respondTo.lg`
    flex-direction: column;
  `}
`;

const BalanceItem = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: 1.5rem;
`;

const Balances = styled(Panel)`
  width: 35%;
  ${theme.respondTo.lg`
    width: 100%;
  `}

  ${BalanceItem}:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Markets = styled.div`
  flex: 1;
  margin-left: 2rem;

  ${theme.respondTo.lg`
    margin-left: 0rem;
    margin-top: 2rem;
  `}
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  .item-link {
    ${theme.respondTo.lg`
      width: 100%;
      border: none !important;
      border-bottom: 1px solid ${theme.borderColor} !important;
    `}

    width: 50%;

    &:nth-child(1) {
      border-bottom: 1px solid ${theme.borderColor};
      border-right: 1px solid ${theme.borderColor};
    }

    &:nth-child(2) {
      border-bottom: 1px solid ${theme.borderColor};
    }

    &:nth-child(3) {
      border-right: 1px solid ${theme.borderColor};
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .link-icon {
    font-size: 2rem;
    margin-right: 1.5rem;
  }
  padding: 3rem 1rem;
`;

const Title = styled.div`
  font-weight: ${theme.boldWeight};
  font-size: 1.25rem;
`;

const Description = styled.div`
  margin-top: 0.5rem;
  font-size: ${theme.textNormalSize};
  font-weight: ${theme.normalWeight};
  color: ${theme.lightForegroundColor};
`;

const Component = () => (
  <Container>
    <Text size="h">Dashboard</Text>
    <Separator />
    <DashboardContainer>
      <Balances>
        <Text size="l">Balances</Text>
        <Separator size={1} />
        <BalanceItem>
          <Flex>
            <Balance symbol="DAI" />
            <Faucet symbol="DAI" amount="100" />
          </Flex>
        </BalanceItem>
        <BalanceItem>
          <Balance symbol="fEUR" />
        </BalanceItem>
        <BalanceItem>
          <Balance symbol="fJPY" />
        </BalanceItem>
        <BalanceItem>
          <Balance symbol="fXAU" />
        </BalanceItem>
        <BalanceItem>
          <Balance symbol="fAAPL" />
        </BalanceItem>
      </Balances>
      <Markets>
        <Text size="l">Markets</Text>
        <Separator />
        <ChartTicker />

        <Items>
          <Link to="/margin" className="item-link">
            <Item>
              <FontAwesomeIcon icon="chart-line" className="link-icon" />
              <Title>
                Margin Trading
                <Description>Lerverged trading up to 50×</Description>
              </Title>
            </Item>
          </Link>
          <Link to="/swap" className="item-link">
            <Item>
              <FontAwesomeIcon icon="exchange-alt" className="link-icon" />
              <Title>
                Spot Exchange
                <Description>Synthetic assets, infinite liquidity</Description>
              </Title>
            </Item>
          </Link>
          <Link to="/lending" className="item-link">
            <Item>
              <FontAwesomeIcon icon="landmark" className="link-icon" />
              <Title>
                Deposit &amp; Earn
                <Description>Earn interest on synthetic assets</Description>
              </Title>
            </Item>
          </Link>
          <Link to="/liquidity" className="item-link">
            <Item>
              <FontAwesomeIcon icon="hand-holding-usd" className="link-icon" />
              <Title>
                Liquidity Provider
                <Description>Become a counter party &amp; earn</Description>
              </Title>
            </Item>
          </Link>
        </Items>
      </Markets>
    </DashboardContainer>
  </Container>
);

export default Component;
