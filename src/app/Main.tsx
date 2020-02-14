import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'styled-components';

import { Container, Prime, PrimeColumn, SideBar, SideColumn } from '../components';
import Dashboard from '../pages/Dashboard';
import Lending from '../pages/Deposit';
import Swap from '../pages/Swap';
import * as theme from '../theme';
import Header from './Header';
import Liquidity from './liquidity/liquidity';
import Margin from './margin/margin';
import Navigation from './navigation';
import NetworkGuardModal from './NetworkGuardModal';

const Main: React.FC = () => (
  <ContainerWrapper>
    <SideColumn>
      <SideBar>
        <Navigation />
      </SideBar>
    </SideColumn>
    <PrimeColumn>
      <Prime>
        <Header />
        <div className="main__content">
          <Switch>
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
          </Switch>
        </div>
        <NetworkGuardModal />
      </Prime>
    </PrimeColumn>
  </ContainerWrapper>
);

const ContainerWrapper = styled(Container)`
  .main__content {
    margin: 3rem;
    ${theme.respondTo.sm`
      margin: 1rem;
    `}
  }
`;

export default Main;
