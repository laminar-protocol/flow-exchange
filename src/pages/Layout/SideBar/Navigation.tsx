import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import LaminarLogo from '../../../assets/laminar.svg';
import { ExternalLink, Row, Tooltip } from '../../../components';
import {
  EmailIcon,
  ExchangeIcon,
  FaucetIcon,
  GuideIcon,
  MenuDashboardIcon,
  MenuDepositIcon,
  MenuLiquidityIcon,
  MenuMarginIcon,
  MenuSwapIcon,
  TwitterIcon,
} from '../../../icons';
import useApp from '../../../store/useApp';
import MenuItem from './MenuItem';
import SwitchChain from './SwitchChain';
import UploadMetadata from './UploadMetadata';
import Wallet from './Wallet';

const Navigation: React.FC = () => {
  const classes = useStyle();
  const { t } = useTranslation();

  const api = useApp(state => state.api);
  const history = useHistory();

  const [showSwitchChain, setShowSwitchChain] = useState(false);

  const networkName = useMemo(() => {
    if (api?.chainType === 'ethereum') {
      return 'ethereum';
    }
    if (api?.chainType === 'laminar') {
      return 'laminar';
    }
    return 'Select';
  }, [api]);

  const chainName = useMemo(() => {
    if (api?.chainType === 'laminar') {
      //@ts-ignore
      return api?.asLaminar?.apiProvider.api?._runtimeChain?.toString();
    }
    return '';
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
            {t('Dashboard')}
          </MenuItem>
          <MenuItem iconComponent={MenuMarginIcon} to="/margin">
            {t('Margin Trading')}
          </MenuItem>
          <MenuItem iconComponent={MenuSwapIcon} to="/swap">
            {t('Swap')}
          </MenuItem>
          <MenuItem iconComponent={MenuLiquidityIcon} to="/provider">
            {t('Liquidity Provider')}
          </MenuItem>
          {networkName === 'ethereum' && (
            <MenuItem iconComponent={MenuDepositIcon} to="/lending">
              {t('Deposit & Earn')}
            </MenuItem>
          )}
        </div>
        <div className={classes.icons}>
          {networkName !== 'ethereum' && (
            <Tooltip placement="topLeft" title="Discord Faucet">
              <div className={classes.iconsItem}>
                <ExternalLink to="https://discord.gg/VNjPcBZ">
                  <FaucetIcon />
                </ExternalLink>
              </div>
            </Tooltip>
          )}
          {networkName !== 'ethereum' && (
            <Tooltip title="Wiki">
              <div className={classes.iconsItem}>
                <ExternalLink to="https://github.com/laminar-protocol/laminar-chain/wiki/1.-Get-Started">
                  <GuideIcon />
                </ExternalLink>
              </div>
            </Tooltip>
          )}
          <Tooltip title="Twitter">
            <div className={classes.iconsItem}>
              <ExternalLink to="https://twitter.com/LaminarProtocol">
                <TwitterIcon />
              </ExternalLink>
            </div>
          </Tooltip>
          <Tooltip title="Email">
            <div className={classes.iconsItem}>
              <ExternalLink to="mailto:hello@laminar.one">
                <EmailIcon />
              </ExternalLink>
            </div>
          </Tooltip>
        </div>
        {chainName && (
          <div className={classes.switchChain}>
            <div
              className={classes.switchNetworkBtn}
              onClick={() => {
                setShowSwitchChain(true);
              }}
            >
              <ExchangeIcon className={classes.switchNetworkIcon} />
              {chainName}
            </div>
          </div>
        )}
        <SwitchChain
          visible={showSwitchChain}
          onCancel={() => setShowSwitchChain(false)}
          onOk={() => setShowSwitchChain(false)}
        />
        <UploadMetadata />
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
  icons: {
    paddingTop: 16,
    display: 'flex',
  },
  iconsItem: {
    marginLeft: 8,
    marginRight: 8,
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
    display: 'flex',
    marginTop: '0.75rem',
  },
  switchChain: {
    display: 'flex',
    flexDirection: 'flex-end',
    marginTop: '16px',
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
