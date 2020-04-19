import { Steps } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Col, LightButton, Row, SolidButton } from '../../components';
import { apiSelector, useApp } from '../../store/useApp';
import { notificationHelper } from '../../utils';

const { Step } = Steps;

const LiquidityCreate: React.FC = () => {
  const api = useApp(apiSelector);
  const currentAccount = useApp(state => state.currentAccount);
  const history = useHistory();

  const [loading, setLoading] = useState<number | null>(null);

  const deploy = async () => {
    if (currentAccount) {
      setLoading(0);
      notificationHelper(api.createPool(currentAccount.address)).finally(() => {
        setLoading(null);
      });
    }
  };

  return (
    <div>
      <Row gutter={[24, 48]} justify="end">
        <Col span={24}>
          <Steps>
            <Step title="Create A Pool" />
            <Step title="Add Liquidity" />
            <Step title="Confirmation" />
          </Steps>
        </Col>
        <Col>
          <LightButton onClick={() => history.push('/liquidity')}>Cancel</LightButton>
        </Col>
        <Col>
          <SolidButton loading={loading === 0} onClick={() => deploy()}>
            Deploy
          </SolidButton>
        </Col>
      </Row>
    </div>
  );
};

export default LiquidityCreate;
