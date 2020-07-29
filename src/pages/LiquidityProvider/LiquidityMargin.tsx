import React, { memo, useMemo } from 'react';
import { Amount, NumberFormat, OraclePrice, Threshold } from '../../components';
import { useApi, useTraderInfo } from '../../hooks';
import useMarginPoolsStore from '../../store/useMarginPools';
import { MarginPoolInfo } from '../../services';
import useMarginPools, { useLoadPoolEntities, useLoadTraderInfo, useLoadMarginInfo } from '../../store/useMarginPools';
import { notificationHelper, toPrecision, fromPrecision } from '../../utils';
import RenderPoolsCollapse, { RenderPoolsCollapseItem } from './RenderPoolsCollapse';

const LiquidityMarginDetail: React.FC<{
  data: MarginPoolInfo;
}> = memo(({ data }) => {
  useLoadTraderInfo({ variables: { poolId: data.poolId } });
  useLoadMarginInfo();

  const trarderInfo = useTraderInfo(data.poolId);
  const marginInfo = useMarginPoolsStore(state => state.marginInfo);

  return (
    <>
      <RenderPoolsCollapseItem label="Address" value={data.owner} width="10rem" />
      <RenderPoolsCollapseItem
        label="ENP"
        value={
          <Threshold high={marginInfo.enpThreshold.marginCall} low={marginInfo.enpThreshold.stopOut} value={data.enp} />
        }
      />
      <RenderPoolsCollapseItem
        label="ELL"
        value={
          <Threshold high={marginInfo.ellThreshold.marginCall} low={marginInfo.ellThreshold.stopOut} value={data.ell} />
        }
      />
      <RenderPoolsCollapseItem
        label="Margin Level"
        value={
          trarderInfo &&
          (Number(fromPrecision(trarderInfo.marginLevel, 18)) > 1000 ? (
            'Very Safe'
          ) : (
            <NumberFormat value={trarderInfo.marginLevel} percent options={{ mantissa: 2 }} />
          ))
        }
      />
      <RenderPoolsCollapseItem label="Equity" value={trarderInfo && <Amount value={trarderInfo.equity} />} />
    </>
  );
});

const LiquidityMargin: React.FC = memo(() => {
  const api = useApi();

  const marginPoolInfo = useMarginPools(state => state.poolEntities.byId);

  useLoadPoolEntities();

  const data = useMemo(() => {
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
