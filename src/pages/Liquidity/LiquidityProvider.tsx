import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import { Amount, SolidButton, Spinner, Text } from '../../components';
import { baseTokenInfoSelector, useApp } from '../../hooks/useApp';
import { poolInfoSelector, usePools, usePoolsSelector } from '../../hooks/usePools';
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
  const poolLiquidity = usePools(state => state.poolLiquidity);

  const poolInfo = usePoolsSelector(poolInfoSelector(pool.id), [pool.id]);

  return (
    <div className={classes.root}>
      <div style={{ width: '15%' }}>
        <Text size="l" weight="bold">
          {pool.name}
        </Text>
      </div>
      <div>
        <div>
          <Text size="s" light>
            Pool Address
          </Text>
        </div>
        <div>
          <Text size="l">{!loading ? pool.address : <Spinner loading />}</Text>
        </div>
      </div>
      <div>
        <div>
          <Text size="s" light>
            Liquidity
          </Text>
        </div>
        {!loading && baseTokenInfo && poolInfo && poolInfo.options[tokenId] ? (
          <div>
            <Text size="l">
              <Amount
                value={calcTokenLiquidity(poolInfo.liquidity, poolInfo.options[tokenId].additionalCollateralRatio || 0)}
                token={baseTokenInfo}
              />
            </Text>
          </div>
        ) : (
          <Spinner loading />
        )}
      </div>
      <div>
        <SolidButton>
          <Link to={`/liquidity/${pool.id}`}>Details</Link>
        </SolidButton>
      </div>
    </div>
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
