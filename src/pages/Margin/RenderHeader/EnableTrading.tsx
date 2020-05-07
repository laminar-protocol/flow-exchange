import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Description, Switch } from '../../../components';
import { useCurrentAccount, useApi, useForceUpdate } from '../../../hooks';
import { notificationHelper } from '../../../utils';
import useMargin from '../hooks/useMargin';
import useMarginEnable from '../hooks/useMarginEnable';

type TotalBalanceProps = {};

const TotalBalance: React.FC<TotalBalanceProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApi();
  const { address } = useCurrentAccount();
  const setState = useMargin(state => state.setState);

  const allowanceEnable = useMarginEnable();
  const [loading, setLoading] = useState(false);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (api.asEthereum.margin.allowance) {
      const subscription = api.asEthereum.margin.allowance(address).subscribe((result: string) => {
        setState(state => {
          state.allowance = result;
        });
      });

      return () => subscription?.unsubscribe();
    }
  }, [address, api, tick, setState]);

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
        checked={allowanceEnable}
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
