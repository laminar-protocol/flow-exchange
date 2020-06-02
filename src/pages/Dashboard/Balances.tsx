import React from 'react';
import { createUseStyles } from 'react-jss';
import { Balance, Panel, Table } from '../../components';
import useAppStore from '../../store/useApp';

const Balances: React.FC = () => {
  const classes = useStyles();

  const tokens = useAppStore(state => state.tokens);

  const columns: any[] = [
    {
      title: '',
      dataIndex: 'symbol',
    },
    {
      title: '',
      dataIndex: 'id',
      align: 'right',
      render: (value: any) => <Balance tokenId={value} />,
    },
  ];

  return (
    <Panel title={'Balance'} className={classes.root}>
      <Table variant="panelTable" columns={columns} dataSource={tokens} hideHeader rowKey="id" />
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: '35%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export default Balances;
