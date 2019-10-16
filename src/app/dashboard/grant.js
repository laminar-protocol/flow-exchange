import React, { useEffect } from 'react';
import {
  TextCell, Switch,
} from 'components';
import { fromWei } from 'helpers/unitHelper';

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
      <Switch
        checked={granted}
        disabled={isQueryingAuthorization || isGranting}
        onClick={() => { onDaiGrant(granted); }}
      />
    </TextCell>
  );
};

export default Component;
