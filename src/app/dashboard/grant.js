import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
  TextCell, Switch, Text,
} from 'components';
import { fromWei } from 'helpers/unitHelper';
import {
  getAuthorization,
  getIsQueryingAuthorization,
  getIsGranting,
} from 'reducers/token.reducer';

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
  token, onAuthorizationQuery, onGrant,
}) => {
  const symbol = 'dai';
  const authorization = getAuthorization(symbol, token);
  const isGranting = getIsGranting(symbol, token);
  const isQueryingAuthorization = getIsQueryingAuthorization(symbol, token);

  const granted = (fromWei(authorization) > 0);

  useEffect(() => {
    onAuthorizationQuery(symbol);
  }, [onAuthorizationQuery]);

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
          onClick={() => { onGrant(symbol, granted); }}
        />
      </Grant>
    </TextCell>
  );
};

export default Component;
