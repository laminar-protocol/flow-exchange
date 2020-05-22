import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { BaseProps } from '../../types';
import { unformatNumber } from '../../utils';

type PriceStatusProps = {
  value?: string | number;
  timestamp?: number;
};

const PriceStatus: React.FC<BaseProps & PriceStatusProps> = ({
  component: Component = 'span',
  value,
  timestamp,
  children,
  className,
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

  return (
    <Component
      className={clsx(className, {
        [classes.green]: status === 1,
        [classes.red]: status === -1,
      })}
      {...other}
    >
      {value}
    </Component>
  );
};

const useStyles = createUseStyles(theme => ({
  green: {
    color: theme.indicatorGreenColor,
  },
  red: {
    color: theme.indicatorRedColor,
  },
}));

export default PriceStatus;
