import React from 'react';
import styled from 'styled-components';

import {
  Modal, SolidButton, Button, Separator, Text,
} from 'components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > button {
    margin: 0.25rem 0;
  }
`;

export interface StateProps {
  isConnectModalActive: boolean;
  isConnecting: boolean;
  onEthereumConnect: () => void;
  onClose: () => void;
}

const Component: React.FC<StateProps> = ({
  isConnectModalActive,
  isConnecting,
  onEthereumConnect,
  onClose,
}) => (
  <Modal
    centered
    visible={isConnectModalActive}
    closable={false}
    footer={null}
    onCancel={() => onClose()}
  >
    <Container>
      <Text size="t">Connect</Text>
      <Separator size={1} />
      <SolidButton size="large" onClick={onEthereumConnect} loading={isConnecting}>MetaMask</SolidButton>
      <SolidButton size="large" disabled>Coinbase Wallet</SolidButton>
      <SolidButton size="large" disabled>Ledger</SolidButton>
      <Separator size={1} />
      <Button size="large" onClick={onClose}>Cancel</Button>
    </Container>
  </Modal>
);

export default Component;
