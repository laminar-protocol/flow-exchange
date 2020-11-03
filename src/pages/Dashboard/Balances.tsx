import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Balance, Panel, PrimaryButton, Table } from '../../components';
import useAppStore from '../../store/useApp';
import RenderTransferModal from './RenderTransferModal';

const Balances: React.FC = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
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
      render: (value: any) => {
        return (
          <React.Fragment>
            {/* {value === 'AUSD' && ( // Disable crosschain transfer for this testnet
              <PrimaryButton onClick={() => setShowModal(true)} style={{ marginRight: 48 }}>
                Transfer
              </PrimaryButton>
            )} */}
            <Balance tokenId={value} />
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <Panel title={'Balance'} className={classes.root}>
      <Table variant="panelTable" columns={columns} dataSource={tokens} hideHeader rowKey="id" />
      <RenderTransferModal visible={showModal} onOk={() => setShowModal(false)} onCancel={() => setShowModal(false)} />
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
