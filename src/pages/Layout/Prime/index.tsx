import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Layout } from '../../../components';

const Prime: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Layout className={clsx(classes.root, classes.between)}>{children}</Layout>;
};

const useStyles = createUseStyles(theme => ({
  root: {
    marginLeft: theme.sideBarWidth,
    padding: '2rem 2.5rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: '1rem',
    },
  },
  between: {
    [theme.breakpoints.between('sm', 'lg')]: {
      padding: '1.5rem 2rem',
    },
  },
}));

export default Prime;
