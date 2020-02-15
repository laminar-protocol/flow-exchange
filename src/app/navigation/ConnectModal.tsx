import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Modal, Separator, SolidButton, Text } from '../../components';
import { useApp, useAppApi } from '../../hooks';
import { Impl } from '../../types';

const ConnectModal: React.FC = ({ ...other }) => {
  const connectModalShow = useApp(state => state.connectModalShow);
  const setProvider = useApp(state => state.setProvider);
  const [loading, setLoading] = useState('');

  const closeModal = () => useAppApi.setState(state => (state.connectModalShow = false));

  const handleConnect = async (impl: Impl) => {
    setLoading(impl);
    const provider = setProvider(impl);
    await provider?.api.enable();
    setLoading('');
    closeModal();
  };

  return (
    <Modal centered visible={connectModalShow} closable={false} footer={null} onCancel={() => closeModal()} {...other}>
      <Container>
        <Text size="t">Connect</Text>
        <Separator size={1} />
        <SolidButton size="large" onClick={() => handleConnect('ethereum')} loading={loading === 'ethereum'}>
          MetaMask
        </SolidButton>
        <SolidButton size="large" onClick={() => handleConnect('polkadot')} loading={loading === 'polkadot'}>
          Polkadot Extension
        </SolidButton>
        <Separator size={1} />
        <Button size="large" onClick={() => closeModal()}>
          Cancel
        </Button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > button {
    margin: 0.25rem 0;
  }
`;

export default ConnectModal;
