import clsx from 'clsx';
import React, { useMemo, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { NumberFormat } from '../../../components';
import { useBaseTokenInfo, useGetOraclePrice, useGetTradingPair } from '../../../hooks';
import { fromPrecision } from '../../../utils';

type PlProps = {
  positionId: string;
  openPrice: string;
  closedPrice?: string;
  held: string;
  pair: {
    quote: string;
    base: string;
  };
  poolId: string;
  pairId: string;
  direction: 'long' | 'short';
};

const Pl: React.FC<PlProps> = React.memo(({ closedPrice, held, openPrice, pair, poolId, pairId, direction }) => {
  const classes = useStyles();

  const baseToken = useBaseTokenInfo();
  const getOraclePrice = useGetOraclePrice(pair.base, pair.quote);
  const getTradingPair = useGetTradingPair();

  const getCurrPrice = useCallback(() => {
    const tradingPair = getTradingPair(poolId, pairId);
    return getOraclePrice(direction === 'long' ? tradingPair?.askSpread : tradingPair?.bidSpread, direction)?.value;
  }, [getTradingPair, getOraclePrice, poolId, pairId, direction]);

  const value = useMemo(() => {
    const currPrice = closedPrice ? Number(fromPrecision(closedPrice, 18)) : getCurrPrice();

    const delta = (direction === 'long' ? -1 : 1) * ((currPrice || 0) - Number(fromPrecision(openPrice, 18)));

    const unrealized = Number(fromPrecision(held, 18)) * delta;

    if (pair.quote !== baseToken?.id) {
      const price = getOraclePrice('0', 'long');

      return price ? unrealized / price.value : 0;
    }

    return unrealized;
  }, [held, direction, getOraclePrice, baseToken, openPrice, pair, getCurrPrice, closedPrice]);

  if (!value) return null;

  const symbol = value < 0 ? '' : '+';
  return (
    <div
      className={clsx({
        [classes.green]: symbol === '+',
        [classes.red]: symbol === '',
      })}
    >
      {symbol}
      <NumberFormat value={value} options={{ mantissa: 3 }} />
    </div>
  );
});

const useStyles = createUseStyles(theme => ({
  green: {
    color: theme.indicatorGreenColor,
  },
  red: {
    color: theme.indicatorRedColor,
  },
}));

export default Pl;
