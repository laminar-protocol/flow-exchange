import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { BaseProps } from '../../types';

type TitleProps = {
  type: 'page';
};

const Title: React.FC<TitleProps & BaseProps> = ({ component: Component = 'h2', type, className, ...other }) => {
  const classes = useStyles();

  return (
    <Component
      className={clsx(className, {
        [classes.page]: type === 'page',
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
  },
}));

export default Title;
