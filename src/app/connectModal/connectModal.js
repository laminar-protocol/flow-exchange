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

const Component = ({ ethereum, onClose, onEthereumConnect }) => (
  <Modal
    centered
    visible={ethereum.isConnectModalActive}
    closable={false}
    footer={null}
    onCancel={() => onClose()}
  >
    <Container>
      <Text size="t">Connect</Text>
      <Separator size={1} />
      <SolidButton size="large" onClick={onEthereumConnect} loading={ethereum.isConnecting}>MetaMask</SolidButton>
      <SolidButton size="large" disabled>Coinbase Wallet</SolidButton>
      <SolidButton size="large" disabled>Ledger</SolidButton>
      <Separator size={1} />
      <Button size="large" onClick={onClose}>Cancel</Button>
    </Container>
  </Modal>
);

export default Component;
