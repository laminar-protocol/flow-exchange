import React from 'react';
import styled from 'styled-components';

import NetworkStatus from '../../../app/NetworkStatus';
import LaminarLogo from '../../../assets/laminar.svg';
import { Flex, Icon, Separator, Switch } from '../../../components';
import { useSetting } from '../../../hooks';
import { theme } from '../../../styles';
import MenuItem from './MenuItem';
import Wallet from './Wallet';

const Navigation: React.FC = () => {
  const currentTheme = useSetting(state => state.setting.currentTheme);
  const setCurrentTheme = useSetting(state => state.setCurrentTheme);

  return (
    <Container>
      <div>
        <div className="logo-container">
          <img className="logo" src={LaminarLogo} alt="laminar" />
          <div className="logo-text">Flow Exchange</div>
        </div>
        <Separator />
        <div>
          <Wallet />
          <Separator />
          <MenuItem icon="home" to="/dashboard">
            Dashboard
          </MenuItem>
          <Separator />
          <MenuItem icon="chart-line" to="/margin">
            Margin Trading
          </MenuItem>
          <MenuItem icon="exchange-alt" to="/swap">
            Swap
          </MenuItem>
          <MenuItem icon="landmark" to="/lending">
            Deposit &amp; Earn
          </MenuItem>
          <MenuItem icon="hand-holding-usd" to="/liquidity">
            Liquidity Provider
          </MenuItem>
        </div>
      </div>
      <div>
        <Flex>
          <div>
            <NetworkStatus />
          </div>
          <div className="theme-switch">
            <Switch
              onChange={() => {
                setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
              }}
              checked={currentTheme === 'dark'}
            />
            <Icon className="navigation__icon" icon="adjust" />
          </div>
        </Flex>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .logo-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    height: 1.2rem;
    margin-right: 0.5rem;
  }

  .logo-text {
    font-size: 1.25rem;
    vertical-align: middle;
    font-weight: ${theme.boldWeight};
    color: ${theme.foregroundColor};
    text-transform: uppercase;
    background: linear-gradient(90deg, ${theme.keyColorBlue} 0%, ${theme.keyColorRed} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .navigation__icon {
    font-size: ${theme.textNormalSize};
    color: ${theme.lightForegroundColor};
  }

  .theme-switch {
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
      margin-left: 1rem;
    }
  }
`;
export default Navigation;
