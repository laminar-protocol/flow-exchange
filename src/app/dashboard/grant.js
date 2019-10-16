import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  TextCell, Switch, Text,
} from 'components';
import { fromWei } from 'helpers/unitHelper';

const Grant = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GrantHeader = styled.div`
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const Component = ({
  dai, onDaiAuthorizationQuery, onDaiGrant,
}) => {
  const {
    authorizationAmount,
    isQueryingAuthorization,
    isGranting,
  } = dai;

  const granted = (fromWei(authorizationAmount) > 0);

  useEffect(() => {
    onDaiAuthorizationQuery();
  }, [onDaiAuthorizationQuery]);

  return (
    <TextCell accessory={granted ? 'lock-open' : 'lock'} loading={isQueryingAuthorization || isGranting}>
      <Grant>
        <div>
          <GrantHeader>
            <Text size="s" weight="bold" light>Trading</Text>
          </GrantHeader>
          <div>
            <Text size="l" weight="bold">{ granted ? 'Enabled' : 'Disabled' }</Text>
          </div>
        </div>
        <Switch
          checked={granted}
          disabled={isQueryingAuthorization || isGranting}
          onClick={() => { onDaiGrant(!granted); }}
        />
      </Grant>
    </TextCell>
  );
};

export default Component;
