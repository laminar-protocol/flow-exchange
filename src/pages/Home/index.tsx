import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { Text, Row, Col } from '../../components';
import useApp from '../../hooks/useApp';
import { ChainType } from '../../services/Api';

import laminachain from '../../assets/laminachain.png';
import ethereum from '../../assets/ethereum.png';
import walletCoinBase from '../../assets/walletCoinBase.png';
import walletLedger from '../../assets/walletLedger.png';
import walletMetamask from '../../assets/walletMetamask.png';
import walletPolkadot from '../../assets/walletPolkadot.png';
import walletPolkawallet from '../../assets/walletPolkawallet.png';

const Home = () => {
  const history = useHistory();
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const setApiEnable = useApp(state => state.setApiEnable);
  const [loading, setLoading] = useState('');
  const [availableProvider, setAvailableProvider] = useState<ChainType[]>([]);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleConnect = async (chainType: ChainType) => {
    setLoading(chainType);
    await setApiEnable(chainType);
    setLoading('');

    history.push('./dashboard');
  };

  useEffect(() => {
    setAvailableProvider(checkAvailableProvider());

    const timeId = setTimeout(() => {
      setAvailableProvider(checkAvailableProvider());
    }, 100);

    return () => clearTimeout(timeId);
  }, [checkAvailableProvider, setAvailableProvider]);

  return (
    <div className={classes.root}>
      <div>
        <Text className={classes.title} align="center" weight="bold" component="h2">
          {t('Connect a wallet to get started')}
        </Text>
      </div>
      <Row justify="center" gutter={24}>
        <Col>
          <Row className={classes.walletName} align="middle" justify="center">
            <img src={laminachain} alt="laminar" height="12" style={{ marginRight: '1rem' }} />
            <Text size="l">{t('LaminarChain')}</Text>
          </Row>
          <a
            className={classes.walletItem}
            href="https://github.com/polkadot-js/extension"
            rel="noopener noreferrer"
            target="_blank"
            onClick={event => {
              handleConnect('laminar');
              event.preventDefault();
            }}
          >
            <img src={walletPolkadot} alt="Polkadot Extension" />
            {`Polkadot Extension`}
          </a>
          <div className={clsx(classes.walletItem, classes.disabled)}>
            <img src={walletPolkawallet} alt="PolkaWallet" />
            {`PolkaWallet`}
          </div>
        </Col>
        <Col>
          <Row className={classes.walletName} align="middle" justify="center">
            <img src={ethereum} alt="ethereum" height="30" style={{ marginRight: '1rem' }} />
            <Text size="l">{t('Ethereum')}</Text>
          </Row>
          <a
            className={classes.walletItem}
            href="https://metamask.io/"
            rel="noopener noreferrer"
            target="_blank"
            onClick={event => {
              handleConnect('ethereum');
              event.preventDefault();
            }}
          >
            <img src={walletMetamask} alt="Metamask" />
            {`Metamask`}
          </a>
          <div className={clsx(classes.walletItem, classes.disabled)}>
            <img src={walletCoinBase} alt="Coinbase Wallet" />
            {`Coinbase Wallet`}
          </div>
          <div className={clsx(classes.walletItem, classes.disabled)}>
            <img src={walletLedger} alt="Ledger" />
            {`Ledger`}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    paddingTop: '15vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  walletName: {
    height: '2.875rem',
    marginBottom: '1rem',
    width: '14rem',
  },
  walletItem: {
    display: 'flex',
    height: '2.875rem',
    marginBottom: '1rem',
    alignItems: 'center',
    border: `solid 1px ${theme.borderColor}`,
    background: theme.lightBackgroundColor,
    cursor: 'pointer',
    color: theme.foregroundColor,
    fontSize: '1rem',
    '&:hover': {
      color: theme.foregroundColor,
    },
    '&$disabled': {
      color: theme.fadeForegroundColor,
      cursor: 'not-allowed',
    },
    '& img': {
      width: '1rem',
      marginLeft: '1.75rem',
      marginRight: '1rem',
    },
  },
  disabled: {},
}));

export default Home;
