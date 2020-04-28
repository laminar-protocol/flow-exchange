import React, { useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Balance, Panel, PoolName, Table } from '../../components';
import { useApiSelector, useGetSyntheticPoolInfoSelector } from '../../selectors';
import { useSyntheticPools } from '../../store/useSyntheticPools';

type RenderSyntheticPoolsProps = {
  onSelectPool(poolId: string): void;
  selectPoolId: string;
};

const RenderSyntheticPools: React.FC<RenderSyntheticPoolsProps> = ({ onSelectPool, selectPoolId }) => {
  const classes = useStyles();
  const api = useApiSelector();
  const setState = useSyntheticPools(state => state.setState);
  const getPoolInfo = useGetSyntheticPoolInfoSelector();

  const ids = useSyntheticPools(state => state.ids);

  useLayoutEffect(() => {
    if (api?.synthetic?.poolInfo) {
      const s = combineLatest(
        ids.map((poolId: string) => {
          return api.synthetic?.poolInfo(poolId).pipe(
            map((result: any) => {
              setState(state => {
                state.poolInfo[result.poolId] = result;
              });
            }),
          );
        }),
      ).subscribe();

      return () => s && s.unsubscribe();
    }
  }, [api, setState, ids]);

  const columns: any[] = [
    {
      title: 'Liquidity Provider',
      dataIndex: 'poolId',
      render: (value: any) => <PoolName value={value} type="synthetic" />,
    },
    {
      title: 'Swap Rate',
      dataIndex: 'id',
      align: 'right',
      render: (value: any, record: any) => {
        return <Balance tokenId={value} />;
      },
    },
    {
      title: 'Collateral Ratio',
      dataIndex: 'id',
      align: 'right',
      render: (value: any) => <Balance tokenId={value} />,
    },
    {
      title: 'Liquidity：Collateral',
      dataIndex: 'id',
      align: 'right',
      render: (value: any) => <Balance tokenId={value} />,
    },
    {
      title: 'Max Amount',
      dataIndex: 'id',
      align: 'right',
      render: (value: any) => <Balance tokenId={value} />,
    },
  ];

  const data = ids.map((id: string) => getPoolInfo(id)).filter(i => i);

  return (
    <Panel className={classes.root}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="poolId"
        onRow={(record: any) => {
          return {
            onClick: () => onSelectPool(record.poolId),
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
