import React, { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NumberFormat, Panel, PoolName, Table } from '../../components';
import { useApi } from '../../hooks';
import { useSyntheticPools } from '../../store/useSyntheticPools';
import useSwap from './hooks/useSwap';
import useSwapPools from './hooks/useSwapPools';

type RenderSyntheticPoolsProps = {};

const RenderSyntheticPools: React.FC<RenderSyntheticPoolsProps> = () => {
  const classes = useStyles();
  const api = useApi();
  const setSyntheticState = useSyntheticPools(state => state.setState);
  const selectPoolId = useSwap(state => state.selectPoolId);
  const setSwapState = useSwap(state => state.setState);

  const ids = useSyntheticPools(state => state.ids);
  const data = useSwapPools();

  useLayoutEffect(() => {
    if (api?.synthetic?.poolInfo) {
      const s = combineLatest(
        ids.map((poolId: string) => {
          return api.synthetic?.poolInfo(poolId).pipe(
            map((result: any) => {
              setSyntheticState(state => {
                state.poolInfo[result.poolId] = result;
              });
            }),
          );
        }),
      ).subscribe();

      return () => s && s.unsubscribe();
    }
  }, [api, setSyntheticState, ids]);

  useLayoutEffect(() => {
    if (data.length) {
      const findCurrentPool = data.find(({ poolId }) => selectPoolId === poolId);
      if (!findCurrentPool) {
        setSwapState(state => {
          state.selectPoolId = data[0].poolId;
        });
      }
    } else {
      setSwapState(state => {
        state.selectPoolId = '';
      });
    }
  }, [selectPoolId, data, setSwapState]);

  const columns: any[] = [
    {
      title: 'Liquidity Provider',
      dataIndex: 'poolId',
      render: (value: any) => <PoolName value={value} type="synthetic" />,
    },
    {
      title: 'Swap Rate',
      dataIndex: 'swapRate',
      align: 'right',
      render: (value: any) => {
        return <NumberFormat value={value} options={{ mantissa: 5 }} />;
      },
    },
    {
      title: 'Collateral Ratio',
      dataIndex: 'collateralRatio',
      align: 'right',
      render: (value: any) => {
        return <NumberFormat value={value} percent options={{ mantissa: 2 }} />;
      },
    },
    {
      title: 'Liquidity：Collateral',
      dataIndex: 'id',
      align: 'right',
      render: null,
    },
    {
      title: 'Max Amount',
      dataIndex: 'id',
      align: 'right',
      render: null,
    },
  ];

  return (
    <Panel className={classes.root}>
      <Table
        columns={columns}
        dataSource={data}
        variant="panelTable"
        rowKey="poolId"
        onRow={(record: any) => {
          return {
            onClick: () =>
              setSwapState(state => {
                state.selectPoolId = record.poolId;
              }),
          };
        }}
        rowClassName={(record: any) => {
          return record.poolId === selectPoolId ? classes.selectRow : '';
        }}
      />
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '& .ant-table-cell': {
      cursor: 'pointer',
    },
    '& .ant-table-tbody > tr$selectRow.ant-table-row:hover > td': {
      'background-color': theme.backgroundHoverColor,
    },
  },
  selectRow: {
    '&.ant-table-row>td': {
      'background-color': theme.backgroundHoverColor,
    },
  },
}));

export default RenderSyntheticPools;
