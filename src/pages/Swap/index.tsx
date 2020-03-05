import React from 'react';
import { createUseStyles } from 'react-jss';

import { Separator, Title } from '../../components';
import Layout from '../Layout';
import Exchange from './Exchange';
import SwapBalances from './SwapBalances';
import SwapList from './SwapList';

const Swap: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Title type="page">Spot Exchange</Title>
      <Separator />
      <Exchange />
      <div className={classes.swapDetail}>
        <SwapBalances />
        <SwapList />
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  swapDetail: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
}));

export default Swap;
