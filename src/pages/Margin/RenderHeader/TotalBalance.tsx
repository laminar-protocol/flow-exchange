import React from 'react';
import { useTranslation } from 'react-i18next';
import { Amount, Description, SwitchChain } from '../../../components';
import { useBaseTokenInfo } from '../../../hooks';
import useMarginPoolsStore from '../../../store/useMarginPools';

type TotalBalanceProps = {};

const TotalBalance: React.FC<TotalBalanceProps> = () => {
  const { t } = useTranslation();

  const balance = useMarginPoolsStore(state => state.balance);

  const baseToken = useBaseTokenInfo();

  return (
    <Description
      layout="vertical"
      label={<SwitchChain renderEthereum={() => t('Balance (Wallet)')} renderLaminar={() => t('Total Balance')} />}
      align="flex-end"
    >
      {baseToken && <Amount value={balance} tokenId={baseToken.id} hasPostfix />}
    </Description>
  );
};

export default TotalBalance;
