import React, { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { combineLatest } from 'rxjs';
import { NumberFormat } from '../../components';
import { useApi } from '../../hooks';
import useMarginPools from '../../store/useMarginPools';
import { notificationHelper, toPrecision } from '../../utils';
import RenderPoolsCollapse from './RenderPoolsCollapse';

const LiquidityMargin: React.FC = () => {
  const api = useApi();

  const setState = useMarginPools(state => state.setState);
  const allPoolIds = useMarginPools(state => state.allPoolIds);
  const marginPoolInfo = useMarginPools(state => state.poolInfo);

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
        value: <NumberFormat value={item.enp} options={{ mantissa: 2 }} percent precision />,
      },
      {
        label: 'ELL',
        value: <NumberFormat value={item.ell} options={{ mantissa: 2 }} percent precision />,
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
    options: item.options.map(({ pairId, askSpread, bidSpread }) => ({
      id: pairId,
      askSpread,
      bidSpread,
    })),
  }));

  useLayoutEffect(() => {
    const subscription = api.margin.allPoolIds().subscribe((result: any) => {
      setState(state => {
        state.allPoolIds = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, setState]);

  useLayoutEffect(() => {
    const subscription = combineLatest(
      allPoolIds.map(poolId => {
        return api.margin.poolInfo(poolId);
      }),
    ).subscribe((result: any) => {
      for (const item of result) {
        setState(state => {
          state.poolInfo[item.poolId] = item;
        });
      }
    });

    return () => subscription?.unsubscribe();
  }, [api, allPoolIds, setState]);

  const handleDeposit = async (address: string, poolId: string, amount: string) => {
    await notificationHelper(api.asLaminar.margin.depositLiquidity(address, poolId, toPrecision(amount)));
  };

  const handleWithdraw = async (address: string, poolId: string, amount: string) => {
    await notificationHelper(api.asLaminar.margin.withdrawLiquidity(address, poolId, toPrecision(amount)));
  };

  return <RenderPoolsCollapse data={data} handleWithdraw={handleWithdraw} handleDeposit={handleDeposit} />;
};

const useStyles = createUseStyles(theme => ({
  root: {},
}));

export default LiquidityMargin;
