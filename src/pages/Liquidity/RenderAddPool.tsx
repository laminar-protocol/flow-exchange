import { Button, message } from 'antd';
import React, { useCallback, useState } from 'react';

import { Col, Input, LightButton, Modal, Row, SolidButton } from '../../components';
import { baseTokenInfoSelector, useAppApi, useAppSelector } from '../../hooks/useApp';
import { usePools } from '../../hooks/usePools';
import { notificationHelper, toPrecision } from '../../utils';

type RenderAddPoolProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const RenderAddPool: React.FC<RenderAddPoolProps> = ({ visible, onCancel, onOk }) => {
  const { api, currentAccount } = useAppApi.getState();
  const addCustomPool = usePools(state => state.addCustomPool);
  const [name, setName] = useState<string | undefined>();
  const [poolId, setPoolId] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const baseToken = useAppSelector(baseTokenInfoSelector);

  const onSubmit = async () => {
    if (api && poolId && name) {
      setSubmitting(true);
      const result = await api.getPoolAddress(poolId);
      if (result) {
        addCustomPool({
          id: poolId,
          name: name,
          address: result,
          isDefault: false,
        });
        handleOk();
      } else {
        message.error('Pool id is invalid');
      }
      setSubmitting(false);
    }
  };

  const handleCancel = useCallback(() => {
    setName('');
    setPoolId('');
    onCancel();
  }, [onCancel]);

  const handleOk = useCallback(() => {
    setName('');
    setPoolId('');
    onOk();
  }, [onOk]);

  return (
    <Modal
      transitionName="none"
      title="Add Existing Poll"
      visible={visible}
      onCancel={() => handleCancel()}
      footer={null}
      maskClosable={false}
      style={{ top: 200 }}
    >
      <div>
        <Row gutter={[24, 8]}>
          <Col span={24}>Name</Col>
          <Col span={24}>
            <Input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%' }} size="large" />
          </Col>
          <Col span={24}>ID/Address</Col>
          <Col span={24}>
            <Input
              value={poolId}
              onChange={e => setPoolId(e.target.value)}
              style={{ width: '100%' }}
              min={0}
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={[24, 8]} justify="end">
          <Col>
            <LightButton onClick={() => handleCancel()}>Cancel</LightButton>
          </Col>
          <Col>
            <SolidButton onClick={() => onSubmit()} loading={submitting}>
              Confirm
            </SolidButton>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default RenderAddPool;
