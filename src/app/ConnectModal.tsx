import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Modal, SolidButton, Button, Separator, Text } from '../components';
import { useDispatch, useShallowEqualSelector } from '../hooks';
import { actions } from '../types';
import { AppState } from '../reducers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > button {
    margin: 0.25rem 0;
  }
`;

export type StateProps = {
  isConnectModalActive: boolean;
  isConnecting: boolean;
};

const ConnectModal: React.FC = () => {
  const dispatch = useDispatch();

  const { isConnectModalActive, isConnecting } = useShallowEqualSelector<AppState, StateProps>(
    ({ ethereum: { isConnectModalActive, isConnecting } }: AppState) => ({
      isConnectModalActive,
      isConnecting,
    }),
  );

  const onClose = useCallback(() => dispatch(actions.ethereum.modalClose.changed()), [dispatch]);
  const onEthereumConnect = useCallback(() => dispatch(actions.ethereum.modalClose.changed()), [dispatch]);

  return (
    <Modal centered visible={isConnectModalActive} closable={false} footer={null} onCancel={() => onClose()}>
      <Container>
        <Text size="t">Connect</Text>
        <Separator size={1} />
        <SolidButton size="large" onClick={onEthereumConnect} loading={isConnecting}>
          MetaMask
        </SolidButton>
        <SolidButton size="large" disabled>
          Coinbase Wallet
        </SolidButton>
        <SolidButton size="large" disabled>
          Ledger
        </SolidButton>
        <Separator size={1} />
        <Button size="large" onClick={onClose}>
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};

export default ConnectModal;
