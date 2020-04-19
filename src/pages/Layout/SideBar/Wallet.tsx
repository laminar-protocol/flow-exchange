import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Text, Address } from '../../../components';
import { useApp, useAppSelector } from '../../../store/useApp';
import { MenuWalletIcon } from '../../../icons';
import MenuItem from './MenuItem';
import SwitchAccount from './SwitchAccount';

const Wallet: React.FC = ({ ...other }) => {
  const classes = useStyles();

  const api = useAppSelector(state => state.api);
  const currentAccount = useApp(state => state.currentAccount);
  const [switchAccountVisible, setSwitchAccountVisible] = useState(false);

  return (
    <>
      <MenuItem
        iconComponent={MenuWalletIcon}
        noRoute
        {...other}
        onClick={() => {
          if (!api || api.chainType !== 'laminar') return false;
          setSwitchAccountVisible(true);
        }}
      >
        <div>Wallet</div>
        <div>
          <Text size="s" light className={classes.address}>
            {currentAccount ? <Address value={currentAccount.address} maxLength={20} /> : 'Please connect your wallet'}
          </Text>
        </div>
      </MenuItem>
      <SwitchAccount
        visible={switchAccountVisible}
        onCancel={() => setSwitchAccountVisible(false)}
        onOk={() => {
          setSwitchAccountVisible(false);
        }}
      />
    </>
  );
};

const useStyles = createUseStyles({
  address: {
    textOverflow: 'hidden',
  },
});

export default Wallet;
