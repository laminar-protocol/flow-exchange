import { List } from 'antd';
import React, { useCallback } from 'react';

import { Modal } from '../../../components';
import { useApp, useAppApi } from '../../../hooks/useApp';

type SwitchAccountProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const SwitchAccount: React.FC<SwitchAccountProps> = ({ visible, onCancel, onOk }) => {
  const currentAccount = useApp(state => state.currentAccount);
  const accountList = useApp(state => state.accountList);

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(
    address => {
      selectAccount(address);
      return onOk();
    },
    [onOk],
  );

  const selectAccount = useCallback(
    accountAddress => {
      useAppApi.setState(state => {
        const account = accountList.find(({ address }) => accountAddress === address);
        if (!account) return null;
        state.currentAccount = account;
      });
    },
    [useAppApi],
  );

  if (!currentAccount) return null;

  return (
    <Modal
      transitionName="none"
      title="Select Account"
      visible={visible}
      onCancel={() => handleCancel()}
      footer={null}
      maskClosable={true}
      style={{ top: 200 }}
    >
      <div>
        <List
          bordered
          dataSource={accountList}
          renderItem={item => <List.Item onClick={() => handleSubmit(item.address)}>{item.address}</List.Item>}
        />
      </div>
    </Modal>
  );
};

export default SwitchAccount;
