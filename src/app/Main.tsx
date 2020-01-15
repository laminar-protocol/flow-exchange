import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import styled from 'styled-components';

import * as theme from 'theme';

import Menu from 'app/menu/menu';
import Dashboard from 'app/dashboard/dashboard';
import Lending from 'app/lending/lending';
import Margin from 'app/margin/margin';
import Swap from 'app/swap/swap';
import Liquidity from 'app/liquidity/liquidity';
import Header from './Header';
import ConnectModal from './ConnectModal';
import NetworkGuardModal from './NetworkGuardModal';

import { Container, SideBar, Prime, SideColumn, PrimeColumn } from 'components';

const Content = styled.div`
  margin: 3rem;
  ${theme.respondTo.sm`
    margin: 1rem;
  `}
`;

const Main: React.FC<{}> = () => (
  <Container>
    <SideColumn>
      <SideBar>
        <Menu />
      </SideBar>
    </SideColumn>
    <PrimeColumn>
      <Prime>
        <Header />
        <Switch>
          <Content>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/lending">
              <Lending />
            </Route>
            <Route exact path="/margin">
              <Redirect to="/margin/POOL1/EURUSD" />
            </Route>
            <Route path="/margin/:pool/:tradingSymbol">
              <Margin />
            </Route>
            <Route path="/liquidity">
              <Liquidity />
            </Route>
            <Route path="/swap">
              <Swap />
            </Route>
          </Content>
        </Switch>
        <NetworkGuardModal />
        <ConnectModal />
      </Prime>
    </PrimeColumn>
  </Container>
);

export default Main;
