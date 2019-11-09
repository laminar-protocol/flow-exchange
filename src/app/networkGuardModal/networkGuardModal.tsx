import React from 'react';
import styled from 'styled-components';

import { Modal, Text } from 'components';
import { network } from 'config';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
`;

export interface StateProps {
  isNetworkGuardModalActive?: boolean;
}

const NetworkGuardModal: React.FC<StateProps> = ({
  isNetworkGuardModalActive,
}) => (
  <Modal
    centered
    visible={isNetworkGuardModalActive}
    closable={false}
    footer={null}
  >
    <Container>
      <Text>Connect to {network} network & refesh.</Text>
    </Container>
  </Modal>
);

export default NetworkGuardModal;
