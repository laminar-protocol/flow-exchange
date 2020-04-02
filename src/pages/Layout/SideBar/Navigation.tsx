import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';

import LaminarLogo from '../../../assets/laminar.svg';
import { Row } from '../../../components';
import { ExchangeIcon, MenuDashboardIcon, MenuSwapIcon, MenuLiquidityIcon, MenuDepositIcon } from '../../../icons';
import useApp from '../../../hooks/useApp';

import MenuItem from './MenuItem';
import Wallet from './Wallet';

const Navigation: React.FC = () => {
  const classes = useStyle();
  const api = useApp(state => state.api);
  const history = useHistory();

  const networkName = useMemo(() => {
    if (api) {
      if (api.chainType === 'ethereum') {
        return 'ethereum';
      }
      if (api.chainType === 'laminar') {
        return 'laminar';
      }
    }
    return 'Select';
  }, [api]);

  return (
    <div className={classes.root}>
      <div>
        <Row className={classes.logoContainer}>
          <img className={classes.logo} src={LaminarLogo} alt="laminar" />
          <div className={classes.logoText}>FLOW EXCHANGE</div>
        </Row>
        <Row justify="end" className={classes.switchNetwork}>
          <div
            className={classes.switchNetworkBtn}
            onClick={() => {
              history.push('/');
            }}
          >
            <ExchangeIcon className={classes.switchNetworkIcon} />
            {networkName}
          </div>
        </Row>
        <div className={classes.menuContainer}>
          <Wallet />
          <MenuItem iconComponent={MenuDashboardIcon} to="/dashboard">
            Dashboard
          </MenuItem>
          <MenuItem iconComponent={MenuSwapIcon} to="/swap">
            Swap
          </MenuItem>
          <MenuItem iconComponent={MenuDepositIcon} to="/lending">
            Deposit &amp; Earn
          </MenuItem>
          <MenuItem iconComponent={MenuLiquidityIcon} to="/liquidity">
            Liquidity Provider
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

const useStyle = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  logoContainer: {
    paddingTop: '1rem',
  },
  logo: {
    width: '3.5rem',
    marginRight: '0.75rem',
  },
  logoText: {
    fontSize: '1.2rem',
    verticalAlign: 'middle',
    fontWeight: theme.boldWeight,
    color: theme.foregroundColor,
  },
  switchNetwork: {
    marginTop: '0.75rem',
  },
  switchNetworkBtn: {
    fontSize: '0.875rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: '#0155ff',
    padding: '4px 8px',
    borderRadius: 11.5,
    boxShadow: '0 0 4px 0 rgba(6, 35, 96, 0.06)',
    border: 'solid 1px rgba(1, 85, 255, 0.2)',
  },
  switchNetworkIcon: {
    width: '0.875rem',
    marginRight: '0.25rem',
  },
  menuContainer: {
    margin: '2rem 0',
  },
}));

export default Navigation;
