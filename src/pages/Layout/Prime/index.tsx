import React from 'react';
import { createUseStyles } from 'react-jss';

import { Layout } from '../../../components';

const Prime: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Layout className={classes.root}>{children}</Layout>;
};

const useStyles = createUseStyles(theme => ({
  root: {
    marginLeft: theme.sideBarWidth,
    padding: '3rem',

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: '1rem',
    },
  },
}));

export default Prime;
