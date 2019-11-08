import React from 'react';
import styled from 'styled-components';

import { Modal, Text } from 'components';
import { network } from '../../config';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export interface StateProps {
  isNetworkGuardModalActive: boolean;
}

const Component: React.FC<StateProps> = ({
  isNetworkGuardModalActive,
}) => (
  <Modal
    centered
    visible={isNetworkGuardModalActive}
    closable={false}
    footer={null}
  >
    <Container>
      <Text size="t">Connect to {network} network to proceed.</Text>
    </Container>
  </Modal>
);

export default Component;
