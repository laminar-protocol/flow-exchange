import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { BaseProps } from '../../types';

type TitleProps = {
  type: 'page' | 'panel';
  ellipsisi?: boolean;
};

const Title: React.FC<TitleProps & BaseProps> = ({ component: Component = 'h2', type, className, ...other }) => {
  const classes = useStyles();

  return (
    <Component
      className={clsx(className, {
        [classes.page]: type === 'page',
        [classes.panel]: type === 'panel',
      })}
      {...other}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  page: {
    fontSize: '2rem',
    color: theme.foregroundColor,
    fontWeight: theme.normalWeight,
    margin: 0,
    marginBottom: '2rem',
  },
  panel: {
    fontSize: '1.5rem',
    color: theme.foregroundColor,
    fontWeight: theme.normalWeight,
    margin: 0,
  },
}));

export default Title;
