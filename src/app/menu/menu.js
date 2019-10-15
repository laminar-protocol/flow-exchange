import React from 'react';
import styled from 'styled-components';

import {
  Separator, Flex, Switch,
} from 'components';
import * as theme from 'theme';
import NetworkStatus from 'app/networkStatus/networkStatus.connect';
import LaminarLogo from 'assets/laminar.svg';

import Wallet from './wallet.connect';
import MenuItem from './item';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 1.2rem;
  margin-right: 0.5rem;
`;

const LoogText = styled.div`
  font-size: 1.25rem;
  vertical-align: middle;
  font-weight: ${theme.boldWeight};
  color: ${theme.foregroundColor};
  text-transform: uppercase;
  background: linear-gradient(90deg, ${theme.keyColorBlue} 0%, ${theme.keyColorRed} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Menu = styled.div`
`;

const Component = ({
  setting, onChangeTheme,
}) => (
  <Container>
    <div>
      <LogoContainer>
        <Logo src={LaminarLogo} />
        <LoogText>Flow Exchange</LoogText>
      </LogoContainer>
      <Separator />
      <Menu>
        <Wallet />
        <Separator />
        <MenuItem icon="home" to="/dashboard">Dashboard</MenuItem>
        <Separator />
        <MenuItem icon="chart-line" to="/margin">Margin Trading</MenuItem>
        <MenuItem icon="exchange-alt" to="/swap">Swap</MenuItem>
        <MenuItem icon="landmark" to="/lending">Deposit &amp; Earn</MenuItem>
        <MenuItem icon="hand-holding-usd" to="/liqudity">Liqudity Provider</MenuItem>
      </Menu>
    </div>
    <div>
      <Flex>
        <div>
          <NetworkStatus />
        </div>
        <div>
          <Switch onChange={(value) => { onChangeTheme(value); }} checked={setting.currentTheme === 'dark'} />
        </div>
      </Flex>

    </div>
  </Container>
);

export default Component;
