import React, { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';

import { Amount, Panel, Separator, Text, Title } from '../../components';
import { tokenInfoMapSelector, useApp } from '../../hooks/useApp';
import { defaultPoolOptionsSelector, usePools } from '../../hooks/usePools';
import { calcTokenLiquidity } from '../../utils';

const Deposit = () => {
  const classes = useStyles();
  const allTokens = useApp(tokenInfoMapSelector);
  const pool = usePools(state => state.defaultPool);
  const initPool = usePools(state => state.initPool);
  const liquidity = usePools(state => (pool ? state.poolLiquidity[pool.id] : null));
  const options = usePools(defaultPoolOptionsSelector);
  const tokens = useMemo(() => Object.keys(options), [options]);

  useEffect(() => {
    pool && initPool(pool.id);
  }, [pool, initPool]);

  return (
    <div>
      <Title type="page">Deposit &amp; Earn</Title>
      <Separator />
      <Panel>
        {tokens.map(tokenId => {
          const token = allTokens[tokenId];

          return (
            <div className={classes.provider} key={token.name}>
              <div className={classes.item}>
                <Text size="l" weight="bold">
                  {token.name}
                </Text>
              </div>
              <div className="item">
                <div>
                  <Text size="s" light>
                    Market Size
                  </Text>
                </div>
                <div>
                  <Text size="l">
                    {liquidity && options && (
                      <Amount
                        value={calcTokenLiquidity(liquidity, options[token.id].additionalCollateralRatio || 0)}
                        token={token}
                        hasPrefix
                      />
                    )}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </Panel>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  provider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottom: '1px #e6e6eb solid',
    paddingBottom: '2rem',
    paddingTop: '2rem',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  item: {
    width: '25%',
    [theme.breakpoints.down('lg')]: {
      width: '50%',
    },
    '& div': {
      margin: '0.5rem 0',
    },
  },
}));

export default Deposit;
