import React, { memo, useMemo } from 'react';
import { Amount, NumberFormat, OraclePrice } from '../../components';
import { useApi, useTraderInfo } from '../../hooks';
import { MarginPoolInfo } from '../../services';
import useMarginPools, { useLoadPoolEntities, useLoadTraderInfo } from '../../store/useMarginPools';
import { notificationHelper, toPrecision } from '../../utils';
import RenderPoolsCollapse, { RenderPoolsCollapseItem } from './RenderPoolsCollapse';

const LiquidityMarginDetail: React.FC<{
  data: MarginPoolInfo;
}> = memo(({ data }) => {
  useLoadTraderInfo({ variables: { poolId: data.poolId } });

  const trarderInfo = useTraderInfo(data.poolId);
  return (
    <>
      <RenderPoolsCollapseItem label="Address" value={data.owner} width="10rem" />
      <RenderPoolsCollapseItem
        label="ENP"
        value={<NumberFormat value={data.enp} options={{ mantissa: 2 }} percent />}
      />
      <RenderPoolsCollapseItem
        label="ELL"
        value={<NumberFormat value={data.ell} options={{ mantissa: 2 }} percent />}
      />
      <RenderPoolsCollapseItem
        label="Margin Level"
        value={trarderInfo && <NumberFormat value={trarderInfo.marginLevel} percent options={{ mantissa: 2 }} />}
      />
      <RenderPoolsCollapseItem label="Equity" value={trarderInfo && <Amount value={trarderInfo.equity} />} />
    </>
  );
});

const LiquidityMargin: React.FC = memo(() => {
  const api = useApi();

  const marginPoolInfo = useMarginPools(state => state.poolEntities.byId);

  // useLoadPoolEntities();
  console.log('哦哦哦哦');
  const data = useMemo(() => {
    console.log(JSON.stringify(marginPoolInfo));
    return Object.values(marginPoolInfo).map(item => ({
      poolId: item.poolId,
      detail: <LiquidityMarginDetail data={item} key={item.poolId} />,
      owner: item.owner,
      options: item.options.map(({ pairId, askSpread, bidSpread, pair }) => ({
        id: pairId,
        bidSpread: (
          <OraclePrice spread={bidSpread} baseTokenId={pair.base} quoteTokenId={pair.quote} direction="short" />
        ),
        askSpread: (
          <OraclePrice spread={askSpread} baseTokenId={pair.base} quoteTokenId={pair.quote} direction="long" />
        ),
      })),
    }));
  }, [marginPoolInfo]);

  const handleDeposit = async (address: string, poolId: string, amount: string) => {
    await notificationHelper(api.asLaminar.margin.depositLiquidity(address, poolId, toPrecision(amount)));
  };

  const handleWithdraw = async (address: string, poolId: string, amount: string) => {
    await notificationHelper(api.asLaminar.margin.withdrawLiquidity(address, poolId, toPrecision(amount)));
  };

  return (
    <RenderPoolsCollapse data={data} handleWithdraw={handleWithdraw} handleDeposit={handleDeposit} type="margin" />
  );
});

export default LiquidityMargin;
