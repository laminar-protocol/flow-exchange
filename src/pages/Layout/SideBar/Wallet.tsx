import { Text } from 'components';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { truncate } from '../../../_app/helpers/stringHelper';
import { useApp } from '../../../hooks';
import MenuItem from './MenuItem';
import SwitchAccount from './SwitchAccount';

const Address = styled(Text)`
  text-overflow: ellipsis;
`;

const accountName = (account: string) => {
  if (account) {
    return truncate(account, 20);
  }
  return null;
};

const Wallet: React.FC = ({ ...other }) => {
  const currentAccount = useApp(state => state.currentAccount);
  const history = useHistory();
  const [switchAccountVisible, setSwitchAccountVisible] = useState(false);

  return (
    <>
      <MenuItem
        icon="wallet"
        noRoute
        {...other}
        onClick={() => {
          history.push('/');
        }}
      >
        <div>Wallet</div>
        <div>
          <Address size="s" light>
            {currentAccount ? accountName(currentAccount.address) : 'Please connect your wallet'}
          </Address>
        </div>
      </MenuItem>
      <MenuItem icon="wallet" noRoute {...other} onClick={() => setSwitchAccountVisible(true)}>
        <div>Switch Account</div>
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

export default Wallet;
