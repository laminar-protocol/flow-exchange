import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Address, Amount, AmountInput, Description, Dialog, SwitchChain } from '../../components';
import { useAccountBalance, useApi, useCurrentAccount } from '../../hooks';
import { notificationHelper, toPrecision } from '../../utils';

type RenderTransferModalProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const ACALA_ADDRESS = '5CAca1aAUSDCrossChainTransferxxxxxxxxxxxxxxxxikw';

const RenderTransferModal: React.FC<RenderTransferModalProps> = ({ visible, onCancel, onOk }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { address } = useCurrentAccount();
  const api = useApi();

  const baseAmountBalance = useAccountBalance(useCallback(tokenInfo => tokenInfo.isBaseToken, []));

  const [amount, setAmount] = useState('');

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(async () => {
    if (api.isLaminar) {
      await notificationHelper(api.asLaminar.currencies.transfer(address, ACALA_ADDRESS, 'AUSD', toPrecision(amount)));
    }
    setAmount('');
    onOk();
  }, [onOk, api, address, amount]);

  return (
    <Dialog
      title={t('Transfer AUSD')}
      visible={visible}
      onOk={() => handleSubmit()}
      width="35rem"
      okButtonProps={{
        disabled: !amount,
      }}
      onCancel={() => handleCancel()}
      style={{ top: 200 }}
    >
      <div className={classes.head}>
        <div className={classes.label}>AUSD Balance</div>
        <div className={classes.content}>
          {baseAmountBalance ? <Amount value={baseAmountBalance.free} tokenId={baseAmountBalance.tokenId} /> : null}
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.infoItem}>
          <span className={classes.infoLabel}></span>
          <SwitchChain renderLaminar={() => 'Acala Account'} />
          <span className={classes.infoAddress}>
            <Address value={ACALA_ADDRESS} maxLength={42} />
          </span>
        </div>
      </div>
      <div className={classes.control}>
        <AmountInput
          size="large"
          placeholder="Amount"
          value={amount}
          showSuffix
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Description className={classes.inputTip} label={t('Max')}>
        {baseAmountBalance ? <Amount value={baseAmountBalance.free} tokenId={baseAmountBalance.tokenId} /> : null}
      </Description>
    </Dialog>
  );
};

const useStyles = createUseStyles(theme => ({
  head: {
    'background-image': 'url(/coinback.svg)',
    'margin-right': '-22px',
    'margin-left': '-23px',
    'margin-bottom': '16px',
    height: '140px',
    'margin-top': '-20px',
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    color: '#FFFFFF',
    padding: '32px 48px 8px',
  },
  label: {
    'font-size': 16,
  },
  content: {
    'font-size': 24,
    'text-align': 'center',
    'margin-top': 2,
  },
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
    'font-size': '1rem',
    display: 'flex',
    padding: '0.875rem 0 0.875rem ',
  },
  infoLabel: {
    'margin-left': 11,
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
  inputTip: {
    marginTop: '0.5rem',
  },
}));

export default RenderTransferModal;
