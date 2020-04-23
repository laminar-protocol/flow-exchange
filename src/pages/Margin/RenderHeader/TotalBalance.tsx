import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Amount, Description, SwitchChain } from '../../../components';
import { useAccountSelector, useApiSelector } from '../../../selectors';
import useApp from '../../../store/useApp';

type TotalBalanceProps = {};

const TotalBalance: React.FC<TotalBalanceProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApiSelector();
  const account = useAccountSelector();
  const setState = useApp(state => state.setState);

  const balance = useApp(state => state.margin.balance);

  useLayoutEffect(() => {
    if (api.margin?.balance) {
      const subscription = api.margin.balance(account.address).subscribe((result: string) => {
        setState(state => {
          state.margin.balance = result;
        });
      });

      return () => subscription?.unsubscribe();
    }
  }, [account.address, api]);

  return (
    <Description
      layout="vertical"
      label={<SwitchChain ethereum={t('Balance (Wallet)')} laminar={t('Total Balance')} />}
      align="flex-end"
    >
      <Amount value={balance} tokenId={'AUSD'} hasPostfix />
    </Description>
  );
};

const useStyles = createUseStyles(theme => ({}));

export default TotalBalance;
