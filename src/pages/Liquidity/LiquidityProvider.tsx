import React from 'react';
import styled from 'styled-components';

import { Amount, Spinner, Text } from '../../components';
import { getBaseTokenInfo, useApp } from '../../hooks/useApp';
import { getPoolOptions, usePools } from '../../hooks/usePools';
import { PoolInfo, TokenId } from '../../services/Api';
import { theme } from '../../styles';
import { calcTokenLiquidity } from '../../utils';

interface LiquidityProviderProps {
  pool: PoolInfo;
  tokenId: TokenId;
  loading: boolean;
}

const LiquidityProvider: React.FC<LiquidityProviderProps> = ({ pool, tokenId, loading }) => {
  const baseTokenInfo = useApp(getBaseTokenInfo);
  const poolLiquidity = usePools(state => state.poolLiquidity);
  const options = usePools(getPoolOptions);

  return (
    <Container key={pool.id}>
      <div className="lp__item" style={{ width: '15%' }}>
        <Text size="l" weight="bold">
          {pool.name}
        </Text>
      </div>
      <div className="lp__item">
        <div>
          <Text size="s" light>
            Pool Address
          </Text>
        </div>
        <div>
          <Text size="l">{!loading ? pool.address : <Spinner loading />}</Text>
        </div>
      </div>
      <div className="lp__item">
        <div>
          <Text size="s" light>
            Liquidity
          </Text>
        </div>
        {!loading && baseTokenInfo && poolLiquidity && options[tokenId] ? (
          <div>
            <Text size="l">
              <Amount
                value={calcTokenLiquidity(poolLiquidity[pool.id], options[tokenId].additionalCollateralRatio || 0)}
                token={baseTokenInfo}
              />
            </Text>
          </div>
        ) : (
          <Spinner loading />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  ::after {
    content: '';
    width: 100%;
    height: 1px;
    background: ${theme.separatorColor};
    margin: 2rem 0;
  }
  :last-child::after {
    content: none;
  }
  .lp__provider {
    width: 25%;
    ${theme.respondTo.lg`
      width: 50%;
    `}

    div {
      margin: 0.5rem 0;
    }

    .ant-spin {
      margin: 2px;
    }
  }
`;

export default LiquidityProvider;
