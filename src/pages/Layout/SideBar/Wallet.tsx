import { Text } from 'components';
import React from 'react';
import styled from 'styled-components';

import { truncate } from '../../../helpers/stringHelper';
import { useApp } from '../../../hooks';
import MenuItem from './MenuItem';

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

  return (
    <MenuItem icon="wallet" noRoute {...other}>
      <div>Wallet</div>
      <div>
        <Address size="s" light>
          {currentAccount ? accountName(currentAccount.address) : 'Please connect your wallet'}
        </Address>
      </div>
    </MenuItem>
  );
};

export default Wallet;
