import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Description, Switch } from '../../../components';
import { useCurrentAccount, useApi } from '../../../selectors';
import { useForceUpdate } from '../../../hooks';
import { notificationHelper } from '../../../utils';

type TotalBalanceProps = {};

const TotalBalance: React.FC<TotalBalanceProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApi();
  const { address } = useCurrentAccount();
  const [allowance, setAllowance] = useState('');
  const [loading, setLoading] = useState(false);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (api.asEthereum.margin.allowance) {
      const subscription = api.asEthereum.margin.allowance(address).subscribe((result: string) => {
        setAllowance(result);
      });

      return () => subscription?.unsubscribe();
    }
  }, [address, api, tick]);

  const handleSubmit = useCallback(
    async value => {
      if (!api.asEthereum.margin.grant) return;
      setLoading(true);
      try {
        return value
          ? await notificationHelper(api.asEthereum.margin.grant(address))
          : await notificationHelper(api.asEthereum.margin.grant(address, '0'));
      } finally {
        forceUpdate();
        setLoading(false);
      }
    },
    [api, address, forceUpdate],
  );

  return (
    <Description layout="vertical" label={t('ENABLE TRADING')} align="flex-end">
      <Switch
        className={classes.switch}
        checked={!!allowance && allowance !== '0'}
        onChange={value => handleSubmit(value)}
        disabled={loading}
        loading={loading}
      />
    </Description>
  );
};

const useStyles = createUseStyles(theme => ({
  switch: {
    marginTop: '0.125rem',
  },
}));

export default TotalBalance;
