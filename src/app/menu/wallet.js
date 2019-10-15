import React from 'react';
import truncateMiddle from 'truncate-middle';

import {
  Text,
} from 'components';

import MenuItem from './item';

const accountName = (ethereum) => {
  const { account } = ethereum;
  if (account) {
    return truncateMiddle(account, 10, 10, '…');
  }
  return null;
};

const Component = ({
  ethereum, onWalletConnect,
}) => (
  <MenuItem icon="wallet" noRoute onClick={() => onWalletConnect(ethereum)}>
    <div>Wallet</div>
    <div>
      <Text size="s" light>
        { accountName(ethereum) || 'Please connect your wallet' }
      </Text>
    </div>
  </MenuItem>
);

export default Component;
