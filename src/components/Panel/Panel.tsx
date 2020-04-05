import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { BaseProps } from '../../types';

type PanelProps = {
  padding?: number;
  radius?: number;
};

const Panel: React.FC<BaseProps & PanelProps> = ({ className, radius, padding, ...other }) => {
  const classes = useStyles({
    radius,
    padding,
  });

  return <div className={clsx(classes.root, className)} {...other} />;
};

const useStyles = createUseStyles(theme => ({
  root: {
    border: `1px solid ${theme.borderColor}`,
    padding: (props: any) => props.padding || '0.75rem 2rem',
    borderRadius: (props: any) => props.radius || '0.75rem',
    boxShadow: '0 1px 20px 0 rgba(23, 65, 212, 0.02)',
    backgroundColor: theme.lightBackgroundColor,
  },
}));

export default Panel;
