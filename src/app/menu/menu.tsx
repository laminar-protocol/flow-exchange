import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Separator, Flex, Switch } from '../../components';
import * as theme from '../../theme';
import NetworkStatus from '../NetworkStatus';
import LaminarLogo from '../../assets/laminar.svg';
import Wallet from './wallet';
import MenuItem from './item';
import { actions } from '../../types';
import { useDispatch, useShallowEqualSelector } from '../../hooks';

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

const MenuContainer = styled.div``;

const AdjustIcon = styled(FontAwesomeIcon)`
  font-size: ${theme.textNormalSize};
  color: ${theme.lightForegroundColor};
`;

const ThemeSwitch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${AdjustIcon} {
    margin-left: 1rem;
  }
`;

// ----------
// Interface
// ----------
export interface StateProps {
  currentTheme: string;
}

const Menu: React.FC = () => {
  const dispatch = useDispatch();

  const { currentTheme } = useShallowEqualSelector<AppState, StateProps>(({ setting: { currentTheme } }: AppState) => ({
    currentTheme,
  }));

  const onChangeTheme = useCallback(
    (currentTheme: string) => {
      const theme = currentTheme === 'light' ? 'dark' : 'light';
      dispatch(actions.app.theme.changed(theme));
    },
    [dispatch],
  );

  return (
    <Container>
      <div>
        <LogoContainer>
          <Logo src={LaminarLogo} />
          <LoogText>Flow Exchange</LoogText>
        </LogoContainer>
        <Separator />
        <MenuContainer>
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
        </MenuContainer>
      </div>
      <div>
        <Flex>
          <div>
            <NetworkStatus />
          </div>
          <ThemeSwitch>
            <Switch
              onChange={() => {
                onChangeTheme(currentTheme);
              }}
              checked={currentTheme === 'dark'}
            />
            <AdjustIcon icon="adjust" />
          </ThemeSwitch>
        </Flex>
      </div>
    </Container>
  );
};

export default Menu;
