import React from 'react';
import styled from 'styled-components';

import { Text } from 'components';

import { truncate } from 'helpers/stringHelper';
import MenuItem from './item';

const Address = styled(Text)`
  text-overflow: ellipsis;
`;

const accountName = (account: string) => {
  if (account) {
    return truncate(account, 20);
  }
  return null;
};

export interface StateProps {
  account: string;
  onWalletConnect: () => void;
}

const Component: React.FC<StateProps> = ({ account, onWalletConnect }) => (
  <MenuItem icon="wallet" noRoute onClick={() => onWalletConnect()}>
    <div>Wallet</div>
    <div>
      <Address size="s" light>
        {accountName(account) || 'Please connect your wallet'}
      </Address>
    </div>
  </MenuItem>
);

export default Component;
