import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { BaseProps } from '../../types';

interface SeparatorProps {
  size?: number;
  height?: number;
}

const Separator: React.FC<BaseProps & SeparatorProps> = ({ size, height, className, ...other }) => {
  const classes = useStyles({ size, height });

  return <div className={clsx(classes.root, className)} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    margin: (props: SeparatorProps) => `${props.size || 2}rem 0`,
    height: (props: SeparatorProps) => `${props.height || 1}px`,
    'background-color': theme.separatorColor,
  },
}));

export default Separator;
