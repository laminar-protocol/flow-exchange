import { Row } from 'antd';
import { InputNumber, LightButton, Modal, PrimaryButton, Text } from 'components';
import React, { useCallback } from 'react';

const Withdraw: React.FC<{ visible: boolean; poolAddr: string; onClose: () => void }> = ({
  visible,
  poolAddr,
  onClose,
}) => {
  const handleWithdraw = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal footer={null} closable={false} visible={visible}>
      <Row type="flex">
        <Text weight="bold" size="h">
          Withdraw
        </Text>
      </Row>
      <Row type="flex">
        <InputNumber />
        <LightButton>Set Max</LightButton>
      </Row>
      <Row type="flex" justify="end">
        <LightButton style={{ marginRight: '0.2rem' }} onClick={onClose}>
          Cancel
        </LightButton>
        <PrimaryButton style={{ marginLeft: '0.2rem' }} onClick={handleWithdraw}>
          Withdraw
        </PrimaryButton>
      </Row>
    </Modal>
  );
};

export default Withdraw;
