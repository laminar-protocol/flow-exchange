import React from 'react';
import { NumberFormat, OraclePrice } from '../../components';
import { useApi } from '../../hooks';
import useMarginPools, { useLoadPoolEntities } from '../../store/useMarginPools';
import { notificationHelper, toPrecision } from '../../utils';
import RenderPoolsCollapse from './RenderPoolsCollapse';

const LiquidityMargin: React.FC = () => {
  const api = useApi();

  const marginPoolInfo = useMarginPools(state => state.poolEntities.byId);

  useLoadPoolEntities();

  const data = Object.values(marginPoolInfo).map(item => ({
    poolId: item.poolId,
    detail: [
      {
        label: 'Address',
        value: item.owner,
        width: '10rem',
      },
      {
        label: 'ENP',
        value: <NumberFormat value={item.enp} options={{ mantissa: 2 }} percent />,
      },
      {
        label: 'ELL',
        value: <NumberFormat value={item.ell} options={{ mantissa: 2 }} percent />,
      },
      {
        label: 'Margin Level',
        value: '',
      },
      {
        label: 'Equity',
        value: '',
      },
    ],
    options: item.options.map(({ pairId, askSpread, bidSpread, pair }) => ({
      id: pairId,
      askSpread: <OraclePrice spread={askSpread} baseTokenId={pair.base} quoteTokenId={pair.quote} direction="short" />,
      bidSpread: <OraclePrice spread={bidSpread} baseTokenId={pair.base} quoteTokenId={pair.quote} direction="long" />,
    })),
  }));

  const handleDeposit = async (address: string, poolId: string, amount: string) => {
    await notificationHelper(api.asLaminar.margin.depositLiquidity(address, poolId, toPrecision(amount)));
  };

  const handleWithdraw = async (address: string, poolId: string, amount: string) => {
    await notificationHelper(api.asLaminar.margin.withdrawLiquidity(address, poolId, toPrecision(amount)));
  };

  return <RenderPoolsCollapse data={data} handleWithdraw={handleWithdraw} handleDeposit={handleDeposit} />;
};

export default LiquidityMargin;
