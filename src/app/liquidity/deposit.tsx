import { Row } from 'antd';
import BN from 'bn.js';
import { InputNumber, LightButton, Modal, PrimaryButton, Text } from 'components';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import types from 'types';

const Deposit: React.FC<{ visible: boolean; poolAddr: string; onClose: () => void }> = ({
  visible,
  poolAddr,
  onClose,
}) => {
  const [amount, setAmount] = useState<number>();
  const dispatch = useDispatch();
  const handleDeposit = useCallback(() => {
    if (!amount) {
      return;
    }
    dispatch({ type: types.liquidityPool.deposit.requested, payload: { poolAddr, amount: new BN(amount) } });
    onClose();
  }, [dispatch, poolAddr, amount, onClose]);

  return (
    <Modal footer={null} closable={false} visible={visible}>
      <Row type="flex">
        <Text weight="bold" size="h">
          Deposit
        </Text>
      </Row>
      <Row type="flex">
        <InputNumber onChange={setAmount} />
        <LightButton>Set Max</LightButton>
      </Row>
      <Row type="flex" justify="end">
        <LightButton style={{ marginRight: '0.2rem' }} onClick={onClose}>
          Cancel
        </LightButton>
        <PrimaryButton style={{ marginLeft: '0.2rem' }} onClick={handleDeposit}>
          Deposit
        </PrimaryButton>
      </Row>
    </Modal>
  );
};

export default Deposit;
