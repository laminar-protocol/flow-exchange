import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Amount, Card, Col, Row, Separator, SolidButton, Table, Text, Title } from '../../components';
import { baseTokenInfoSelector, tokenInfoMapSelector, useAppSelector } from '../../hooks/useApp';
import { poolDetailSelector, usePools, usePoolsSelector } from '../../hooks/usePools';
import RenderDeposit from './RenderDeposit';
import RenderWithdraw from './RenderWithdraw';

const PoolDetail: React.FC = () => {
  const params = useParams<{ poolId: string }>();
  const tokens = useAppSelector(tokenInfoMapSelector);
  const baseToken = useAppSelector(baseTokenInfoSelector);
  const initPool = usePools(state => state.initPool);
  const deleteCustomPool = usePools(state => state.deleteCustomPool);
  const poolDetail = usePoolsSelector(state => poolDetailSelector(params.poolId)(state), [params.poolId]);
  const [loading, setLoading] = useState(false);
  const [withdrawVisible, setWithdrawVisible] = useState(false);
  const [depositVisible, setDepositVisible] = useState(false);
  const history = useHistory();

  const init = useCallback(() => {
    return initPool(params.poolId);
  }, [initPool, params.poolId, setLoading]);

  useEffect(() => {
    setLoading(true);
    init().finally(() => {
      setLoading(false);
    });
  }, [init]);

  return (
    <div>
      <Title type="page">Liquidity Pool</Title>
      <Separator />
      <Card title="Liquidity" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 16]}>
          <Col span={24}>
            {poolDetail ? (
              <Text size="l">
                <Amount tokenId={baseToken.id} value={poolDetail.liquidity} />
              </Text>
            ) : null}
          </Col>
          <Col>
            <SolidButton onClick={() => setDepositVisible(true)}>Deposit</SolidButton>
          </Col>
          <Col>
            <SolidButton onClick={() => setWithdrawVisible(true)}>Withdraw</SolidButton>
          </Col>
        </Row>
      </Card>
      {poolDetail ? (
        <Table
          rowKey={'tokenName'}
          columns={[
            {
              title: 'Token Name',
              dataIndex: 'tokenName',
            },
            {
              title: 'Ask Spread',
              dataIndex: 'askSpread',
              align: 'right',
            },
            {
              title: 'Bid Spread',
              dataIndex: 'bidSpread',
              align: 'right',
            },
            {
              title: 'Liquidity',
              dataIndex: 'additionalCollateralRatio',
              align: 'right',
            },
          ]}
          dataSource={Object.keys(poolDetail.options).map(tokenId => {
            const token = tokens[tokenId];
            const info = poolDetail.options[tokenId];
            return {
              ...info,
              tokenName: token.name,
            };
          })}
        />
      ) : null}

      <RenderWithdraw
        poolId={params.poolId}
        visible={withdrawVisible}
        handleCancel={() => setWithdrawVisible(false)}
        handleOk={() => {
          init();
          setWithdrawVisible(false);
        }}
      />

      <RenderDeposit
        poolId={params.poolId}
        visible={depositVisible}
        handleCancel={() => setDepositVisible(false)}
        handleOk={() => {
          init();
          setDepositVisible(false);
        }}
      />
      {poolDetail && !poolDetail.isDefault ? (
        <SolidButton
          onClick={() => {
            deleteCustomPool(poolDetail.id, poolDetail.name);
            message.info('success');
            history.push('/liquidity');
          }}
          style={{ marginTop: 24 }}
        >
          删除
        </SolidButton>
      ) : null}
    </div>
  );
};

export default PoolDetail;
