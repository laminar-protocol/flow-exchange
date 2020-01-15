import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Text } from 'components';

import { truncate } from '../../helpers/stringHelper';
import MenuItem from './item';
import { actions } from '../../types';
import { AppState } from '../../reducers';
import { useDispatch, useShallowEqualSelector } from '../../hooks';

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
}

const Wallet: React.FC = () => {
  const dispatch = useDispatch();

  const { account } = useShallowEqualSelector<AppState, StateProps>(({ ethereum: { account } }: AppState) => ({
    account,
  }));

  const onWalletConnect = useCallback(() => dispatch(actions.ethereum.modalOpen.changed()), [dispatch]);

  return (
    <MenuItem icon="wallet" noRoute onClick={() => onWalletConnect()}>
      <div>Wallet</div>
      <div>
        <Address size="s" light>
          {accountName(account) || 'Please connect your wallet'}
        </Address>
      </div>
    </MenuItem>
  );
};

export default Wallet;
