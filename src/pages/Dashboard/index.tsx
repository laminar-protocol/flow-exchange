import React from 'react';
import { createUseStyles } from 'react-jss';

import { Separator, Text, Title } from '../../components';
import Layout from '../Layout';
import Balances from './Balances';
import ChartTicker from './ChartTicker';
import Links from './Links';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Title type="page">Dashboard</Title>
      <Separator />
      <div className={classes.dashboard}>
        <Balances />
        <div className={classes.markets}>
          <Text size="l">Markets</Text>
          <Separator />
          <ChartTicker />
          <Links />
        </div>
      </div>
    </Layout>
  );
};

const useStyles = createUseStyles(theme => ({
  dashboard: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  markets: {
    flex: 1,
    marginLeft: '2rem',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '0rem',
      marginTop: '2rem',
    },
  },
}));

export default Dashboard;
