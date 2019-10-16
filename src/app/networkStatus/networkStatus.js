import React from 'react';
import styled from 'styled-components';
import { Indicator, Text } from 'components';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > :first-child {
    margin-right: 1rem;
  }
`;

const StatusText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > :nth-child(2) {
    margin-top: 0.25rem;
  }
`;

const NetworkName = styled.div`
  text-transform: capitalize;
`;

const indicatorStatus = (ethereum) => {
  const {
    isConnected,
    isConnecting,
  } = ethereum;
  if (isConnecting) {
    return 'yellow';
  }
  if (isConnected) {
    return 'green';
  }
  return 'gray';
};

const networkStatus = (ethereum) => {
  const {
    isConnected,
    isConnecting,
  } = ethereum;
  if (isConnecting) {
    return 'Connecting';
  }
  if (isConnected) {
    return 'Connected';
  }
  return 'Disconnected';
};

const networkName = (ethereum) => {
  const { network } = ethereum;
  switch (network) {
    case 'main':
      return 'Mainnet';
    default:
      return network;
  }
};

const renderNetworkName = (name) => <NetworkName><Text size="s" light>{name}</Text></NetworkName>;

const Component = ({ ethereum }) => (
  <Container>
    <Indicator size={10} color={indicatorStatus(ethereum)} />
    <StatusText>
      <div><Text>{networkStatus(ethereum)}</Text></div>
      {ethereum.isConnected && renderNetworkName(networkName(ethereum))}
    </StatusText>
  </Container>
);

export default Component;
