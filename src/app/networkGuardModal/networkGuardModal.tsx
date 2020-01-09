import React from 'react';
import styled from 'styled-components';

import { Modal, Text } from 'components';
import { network as requiredNetwork } from 'config';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
`;

export interface StateProps {
  isNetworkGuardModalActive?: boolean;
  network?: string;
}

const NetworkGuardModal: React.FC<StateProps> = ({ isNetworkGuardModalActive, network }) => (
  <Modal centered visible={isNetworkGuardModalActive} closable={false} footer={null}>
    <Container>
      <Text>Please connect to {requiredNetwork} network & refesh.</Text>
      <div>Current network: {network}</div>
    </Container>
  </Modal>
);

export default NetworkGuardModal;
