import { List } from 'antd';
import React, { useCallback } from 'react';

import { Dialog } from '../../../components';
import useApp, { useAppApi } from '../../../hooks/useApp';

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
    <Dialog
      title="Choose different account"
      visible={visible}
      onOk={() => {}}
      onCancel={() => handleCancel()}
      style={{ top: 200 }}
    >
      <div>
        <List bordered dataSource={accountList} renderItem={item => <List.Item>{item.address}</List.Item>} />
      </div>
    </Dialog>
  );
};

export default SwitchAccount;
