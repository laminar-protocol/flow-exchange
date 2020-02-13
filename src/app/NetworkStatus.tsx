import React from 'react';
import styled from 'styled-components';

import { Indicator, Text } from '../components';
import { useShallowEqualSelector } from '../hooks';

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

const indicatorStatus = (isConnected: boolean, isConnecting: boolean, isEnabling: boolean) => {
  if (isConnecting || isEnabling) {
    return 'yellow';
  }

  if (isConnected) {
    return 'green';
  }

  return 'gray';
};

const networkStatus = (isConnected: boolean, isConnecting: boolean, isEnabling: boolean) => {
  if (isConnecting || isEnabling) {
    return 'Connecting';
  }
  if (isConnected) {
    return 'Connected';
  }
  return 'Disconnected';
};

const networkName = (network?: string) => {
  if (!network) {
    return 'No Network';
  }

  switch (network) {
    case 'main':
      return 'Mainnet';
    default:
      return network;
  }
};

const renderNetworkName = (name?: string) => (
  <NetworkName>
    <Text size="s" light>
      {name}
    </Text>
  </NetworkName>
);

export type StateProps = {
  isConnected: boolean;
  isConnecting: boolean;
  isEnabling: boolean;
  network?: string;
};

const NetworkStatus: React.FC = () => {
  const { isConnected, isConnecting, isEnabling, network } = useShallowEqualSelector<AppState, StateProps>(
    ({ provider: { isConnected, isConnecting, isEnabling, network } }: AppState) => ({
      isConnected,
      isConnecting,
      isEnabling,
      network,
    }),
  );

  return (
    <Container>
      <Indicator size={10} color={indicatorStatus(isConnected, isConnecting, isEnabling)} />
      <StatusText>
        <div>
          <Text>{networkStatus(isConnected, isConnecting, isEnabling)}</Text>
        </div>
        {isConnected && renderNetworkName(networkName(network))}
      </StatusText>
    </Container>
  );
};

export default NetworkStatus;
