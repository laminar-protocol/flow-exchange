import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Amount, Description, SwitchChain } from '../../../components';
import { useCurrentAccount, useApi } from '../../../hooks';
import useMarginPools from '../../../store/useMarginPools';

type TotalBalanceProps = {};

const TotalBalance: React.FC<TotalBalanceProps> = () => {
  const { t } = useTranslation();

  const api = useApi();
  const { address } = useCurrentAccount();
  const setState = useMarginPools(state => state.setState);

  const balance = useMarginPools(state => state.balance);

  useLayoutEffect(() => {
    if (api.margin?.balance) {
      const subscription = api.margin.balance(address).subscribe((result: string) => {
        setState(state => {
          state.balance = result;
        });
      });

      return () => subscription?.unsubscribe();
    }
  }, [address, api, setState]);

  return (
    <Description
      layout="vertical"
      label={<SwitchChain renderEthereum={() => t('Balance (Wallet)')} renderLaminar={() => t('Total Balance')} />}
      align="flex-end"
    >
      <Amount value={balance} tokenId={'AUSD'} hasPostfix />
    </Description>
  );
};

export default TotalBalance;
