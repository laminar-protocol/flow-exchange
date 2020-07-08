import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { BaseProps } from '../../types';
import { unformatNumber } from '../../utils';

type PriceStatusProps = {
  value?: string | number;
  timestamp?: number;
  variant?: 'tail';
};

const PriceStatus: React.FC<BaseProps & PriceStatusProps> = ({
  component: Component = 'span',
  value,
  timestamp,
  children,
  className,
  variant,
  ...other
}) => {
  const classes = useStyles();

  const currentValue = unformatNumber((value === undefined ? children : value) as string);
  const pre = useRef(currentValue);

  useEffect(() => {
    pre.current = currentValue;
  }, [currentValue]);

  const status = useMemo(() => {
    if (currentValue === undefined || pre.current === undefined || !timestamp) return 0;
    if (currentValue > pre.current) {
      return 1;
    } else if (currentValue < pre.current) {
      return -1;
    } else {
      return 0;
    }
  }, [currentValue, timestamp]);

  const [integer, fraction] = `${value}`.split('.');
  const fractionLastOne = fraction.substr(fraction.length - 1);
  const fractionLast = fraction.substr(fraction.length - 3, 2);
  const fractionHead = fraction.substr(0, fraction.length - 3);

  return (
    <Component
      className={clsx(className, {
        [classes.green]: status === 1,
        [classes.red]: status === -1,
        [classes.tail]: variant === 'tail',
      })}
      {...other}
    >
      <span>
        {integer}.{fractionHead}
      </span>
      <span className={classes.last}>{fractionLast}</span>
      <span className={classes.lastOne}>{fractionLastOne}</span>
    </Component>
  );
};

const useStyles = createUseStyles(theme => ({
  green: {
    color: '#0155ff',
  },
  red: {
    color: theme.indicatorRedColor,
  },
  tail: {
    fontWeight: 'bold',
    '& $last': {
      fontSize: '1.375em',
    },
    '& $lastOne': {
      position: 'relative',
      top: '-0.25em',
    },
  },
  last: {},
  lastOne: {},
}));

export default PriceStatus;
