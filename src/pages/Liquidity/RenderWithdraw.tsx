import React, { useState } from 'react';

import { Col, InputNumber, LightButton, Modal, Row, SolidButton } from '../../components';
import { baseTokenInfoSelector, useAppApi, useAppSelector } from '../../store/useApp';
import { notificationHelper, toPrecision } from '../../utils';

type RenderWithdrawProps = {
  visible: boolean;
  poolId: string;
  handleCancel: () => void;
  handleOk: () => void;
};

const RenderWithdraw: React.FC<RenderWithdrawProps> = ({ visible, handleCancel, handleOk, poolId }) => {
  const { api, currentAccount } = useAppApi.getState();
  const [amount, setAmount] = useState<number | undefined>();
  const baseToken = useAppSelector(baseTokenInfoSelector);

  const onSubmit = async () => {
    if (currentAccount && api && amount) {
      return notificationHelper(
        api.withdrawLiquidity(currentAccount.address, poolId, toPrecision(amount, baseToken.precision)),
      ).then(() => {
        handleOk();
        setAmount(0);
      });
    }
  };

  return (
    <Modal
      transitionName="none"
      title="Withdraw Liquidity"
      visible={visible}
      onCancel={() => handleCancel()}
      footer={null}
      maskClosable={false}
      style={{ top: 200 }}
    >
      <div>
        <Row gutter={[24, 8]}>
          <Col span={24}>Liquidity</Col>
          <Col span={24}>
            <InputNumber
              value={amount}
              onChange={value => setAmount(value)}
              style={{ width: '100%' }}
              min={0}
              className=""
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={[24, 8]} justify="end">
          <Col>
            <LightButton onClick={() => handleCancel()}>Cancel</LightButton>
          </Col>
          <Col>
            <SolidButton onClick={() => onSubmit()}>Confirm</SolidButton>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default RenderWithdraw;
