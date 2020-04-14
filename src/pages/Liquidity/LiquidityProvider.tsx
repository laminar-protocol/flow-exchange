import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import { Amount, Col, Row, SolidButton, Spinner, Text } from '../../components';
import { baseTokenInfoSelector, useApp } from '../../hooks/useApp';
import { poolDetailSelector, usePoolsSelector } from '../../hooks/usePools';
import { PoolInfo, TokenId } from '../../services/Api';
import { calcTokenLiquidity } from '../../utils';

interface LiquidityProviderProps {
  pool: PoolInfo;
  tokenId: TokenId;
  loading: boolean;
}

const LiquidityProvider: React.FC<LiquidityProviderProps> = ({ pool, tokenId, loading }) => {
  const classes = useStyles();
  const baseTokenInfo = useApp(baseTokenInfoSelector);

  const poolInfo = usePoolsSelector(poolDetailSelector(pool.id), [pool.id]);

  return (
    <Row className={classes.root}>
      <Col span={4} style={{ width: '15%' }}>
        <Text size="l" weight="bold" ellipsisi>
          {pool.name}
        </Text>
      </Col>
      <Col span={6}>
        <div>
          <Text size="s" light>
            Pool ID
          </Text>
        </div>
        <div>
          <Text size="s" ellipsisi>
            {!loading ? pool.id : <Spinner loading />}
          </Text>
        </div>
      </Col>
      <Col span={6}>
        <div>
          <Text size="s" light>
            Owner
          </Text>
        </div>
        <div>
          <Text size="s" ellipsisi>
            {!loading ? pool.owner : <Spinner loading />}
          </Text>
        </div>
      </Col>
      <Col span={5}>
        <div>
          <Text size="s" light>
            Liquidity
          </Text>
        </div>
        {!loading && poolInfo && poolInfo.options[tokenId] ? (
          <div>
            <Text size="l">
              <Amount
                value={calcTokenLiquidity(poolInfo.liquidity, poolInfo.options[tokenId].additionalCollateralRatio || 0)}
                tokenId={baseTokenInfo.id}
              />
            </Text>
          </div>
        ) : (
          <Spinner loading />
        )}
      </Col>
      <Col span={3}>
        <SolidButton>
          <Link to={`/liquidity/${pool.id}`}>Details</Link>
        </SolidButton>
      </Col>
    </Row>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: '2rem',
    paddingTop: '2rem',
    borderBottom: `solid 1px ${theme.separatorColor}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

export default LiquidityProvider;
