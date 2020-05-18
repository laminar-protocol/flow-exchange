import React from 'react';
import { useTranslation } from 'react-i18next';
import { Amount, Description, SwitchChain } from '../../../components';
import useMarginPoolsStore from '../../../store/useMarginPools';

type TotalBalanceProps = {};

const TotalBalance: React.FC<TotalBalanceProps> = () => {
  const { t } = useTranslation();

  const balance = useMarginPoolsStore(state => state.balance);

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
