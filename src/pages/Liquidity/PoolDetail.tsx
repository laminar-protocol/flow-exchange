import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Amount, Card, Col, Panel, Row, Separator, Skeleton, SolidButton, Title } from '../../components';
import { baseTokenInfoSelector, tokenInfoMapSelector, useAppSelector } from '../../hooks/useApp';
import { poolInfoSelector, usePools, usePoolsSelector } from '../../hooks/usePools';

const PoolDetail: React.FC = () => {
  const params = useParams<{ poolId: string }>();
  const tokens = useAppSelector(tokenInfoMapSelector);
  const baseToken = useAppSelector(baseTokenInfoSelector);
  const initPool = usePools(state => state.initPool);
  const liquidity = usePools(state => state.poolLiquidity[params.poolId]);
  const poolInfo = usePoolsSelector(poolInfoSelector(params.poolId), [params.poolId]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    initPool(params.poolId).finally(() => {
      setLoading(false);
    });
  }, [initPool, params.poolId, setLoading]);

  return (
    <div>
      <Title type="page">Liquidity Pool</Title>
      <Separator />
      <Card title="Liquidity">{poolInfo ? <Amount tokenId={baseToken.id} value={poolInfo.liquidity} /> : null}</Card>
      {/* <Panel>
        <Skeleton loading={loading}>
          {!poolInfo ? null : (
            <>
              <Row>Liquidity {poolInfo.liquidity}</Row>

              <table>
                <thead>
                  <tr>
                    <td>name</td>
                    <td>askSpread</td>
                    <td>bidSpread</td>
                    <td>additionalCollateralRatio</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(poolInfo.options).map(tokenId => {
                    const token = tokens[tokenId];
                    const info = poolInfo.options[tokenId];
                    return (
                      <tr>
                        <td>{token.name}</td>
                        <td>{info.askSpread}</td>
                        <td>{info.bidSpread}</td>
                        <td>{info.additionalCollateralRatio}</td>
                      </tr>
                    );
                  })}
                  <tr></tr>
                </tbody>
              </table>
              <Row>
                <SolidButton>Deposit</SolidButton>
                <SolidButton>Withdraw</SolidButton>
              </Row>
            </>
          )}
        </Skeleton>
      </Panel> */}
    </div>
  );
};

export default PoolDetail;
