import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Address, AmountInput, Dialog, PoolName, SwitchChain } from '../../components';
import { AppState } from '../../store/useApp';
import { useAccountSelector, useApiSelector } from '../../selectors';
import { notificationHelper, toPrecision } from '../../utils';

type RenderDepositModalProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  data?: AppState['margin']['poolInfo']['string'];
};

export const RenderDepositModal: React.FC<RenderDepositModalProps> = ({ visible, onCancel, onOk, data }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');
  const account = useAccountSelector();
  const api = useApiSelector();

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(async () => {
    if (!api.margin?.deposit) return;
    if (api.isLaminar) {
      await notificationHelper(api.asLaminar.margin.deposit(account.address, toPrecision(amount)));
    }
    if (api.isEthereum && data?.poolId) {
      await notificationHelper(api.asEthereum.margin.deposit(account.address, data.poolId, toPrecision(amount)));
    }
    setAmount('');
    onOk();
  }, [onOk, api, data, account.address, amount]);

  return (
    <Dialog
      title={t('Deposit')}
      visible={visible}
      onOk={() => handleSubmit()}
      width="35rem"
      okButtonProps={{
        disabled: !amount,
      }}
      onCancel={() => handleCancel()}
      style={{ top: 200 }}
    >
      <div className={classes.info}>
        <div className={classes.infoLeft}>
          <div className={classes.yellowCircle}></div>
          <div className={classes.linkCircle}></div>
          <div className={classes.blueCircle}></div>
        </div>
        <div className={classes.infoRight}>
          <div className={classes.infoItem}>
            <span className={classes.infoLabel}>From</span>
            <SwitchChain renderEthereum={() => 'Ethereum'} renderLaminar={() => 'Polkadot'} />
            <span className={classes.infoAddress}>
              <Address value={account.address} maxLength={20} />
            </span>
          </div>
          <div className={classes.infoSeparate}></div>
          <div className={classes.infoItem}>
            <span className={classes.infoLabel}>To</span>
            {data ? <PoolName value={data.poolId} type="margin" /> : null}
          </div>
        </div>
      </div>
      <div className={classes.control}>
        <AmountInput
          size="large"
          placeholder="Amount"
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
      </div>
    </Dialog>
  );
};

export const RenderWithdrawModal: React.FC<RenderDepositModalProps> = ({ visible, onCancel, onOk, data }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');
  const account = useAccountSelector();
  const api = useApiSelector();

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(async () => {
    if (!api.margin?.withdraw) return;
    if (api.isLaminar) {
      await notificationHelper(api.asLaminar.margin.withdraw(account.address, toPrecision(amount)));
    }
    if (api.isEthereum && data?.poolId) {
      await notificationHelper(api.asEthereum.margin.withdraw(account.address, data.poolId, toPrecision(amount)));
    }
    setAmount('');
    onOk();
  }, [onOk, api, data, account.address, amount]);

  return (
    <Dialog
      title={t('Withdraw')}
      visible={visible}
      onOk={() => handleSubmit()}
      width="35rem"
      okButtonProps={{
        disabled: !amount,
      }}
      onCancel={() => handleCancel()}
      style={{ top: 200 }}
    >
      <div className={classes.info}>
        <div className={classes.infoLeft}>
          <div className={classes.yellowCircle}></div>
          <div className={classes.linkCircle}></div>
          <div className={classes.blueCircle}></div>
        </div>
        <div className={classes.infoRight}>
          <div className={classes.infoItem}>
            <span className={classes.infoLabel}>From</span>
            {data ? <PoolName value={data.poolId} type="margin" /> : null}
          </div>
          <div className={classes.infoSeparate}></div>
          <div className={classes.infoItem}>
            <span className={classes.infoLabel}>To</span>
            <SwitchChain renderEthereum={() => 'Ethereum'} renderLaminar={() => 'Polkadot'} />
            <span className={classes.infoAddress}>
              <Address value={account.address} maxLength={20} />
            </span>
          </div>
        </div>
      </div>
      <div className={classes.control}>
        <AmountInput
          size="large"
          placeholder="Amount"
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
      </div>
    </Dialog>
  );
};

const useStyles = createUseStyles(theme => ({
  info: {
    margin: 'auto',
    'border-radius': 2,
    border: `solid 1px ${theme.keyColorGrey}`,
    display: 'flex',
    'algin-items': 'center',
  },
  infoLeft: {
    padding: '0 1rem',
    extend: theme.flexCenter,
    'flex-direction': 'column',
  },
  infoRight: {
    flex: 1,
    'flex-direction': 'column',
    display: 'flex',
  },
  infoItem: {
    // extend: theme.flexCenter,
    'font-size': '1rem',
    display: 'flex',
    padding: '0.875rem 0 0.875rem ',
  },
  infoLabel: {
    'margin-left': 1,
    width: '4.5rem',
  },
  infoAddress: {
    color: theme.textColor.greyColor4,
    'margin-left': '1rem',
  },
  infoSeparate: {
    background: theme.keyColorGrey,
    height: 1,
  },
  yellowCircle: {
    width: '0.5rem',
    height: '0.5rem',
    'background-color': '#f7b500',
    'border-radius': '50%',
  },
  linkCircle: {
    width: 1,
    height: '2.875rem',
    background: theme.keyColorGrey,
  },
  blueCircle: {
    width: '0.5rem',
    height: '0.5rem',
    'background-color': '#0155ff',
    'border-radius': '50%',
  },

  control: {
    'margin-top': '1rem',
  },
}));
