import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { Tooltip } from '../Tooltip';

import { BaseProps } from '../../types';
type TxHashProps = {
  value: string;
  width?: string;
  showTooltip?: boolean;
};

const TxHash: React.FC<TxHashProps & BaseProps & React.HTMLProps<HTMLSpanElement>> = ({
  component: Component = 'span',
  width = '9.375rem',
  showTooltip = true,
  value,
  className,
  ...other
}) => {
  const classes = useStyles();

  const inner = (
    <Component className={clsx(className, classes.root)} style={{ width: width }}>
      {value}
    </Component>
  );

  return showTooltip ? <Tooltip title={value}>{inner}</Tooltip> : inner;
};

const useStyles = createUseStyles(() => ({
  root: {
    overflow: 'hidden',
    display: 'inline-block',
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
  },
}));

export default TxHash;
