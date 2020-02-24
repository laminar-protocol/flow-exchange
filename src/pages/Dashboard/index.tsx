import React from 'react';
import styled from 'styled-components';

import { Separator, Text } from '../../components';
import { theme } from '../../styles';
import Layout from '../Layout';
import Balances from './Balances';
import ChartTicker from './ChartTicker';
import Links from './Links';

const Dashboard = () => (
  <Layout>
    <Container>
      <Text size="h">Dashboard</Text>
      <Separator />
      <div className="dashboard">
        <Balances />
        <div className="markets">
          <Text size="l">Markets</Text>
          <Separator />
          <ChartTicker />
          <Links />
        </div>
      </div>
    </Container>
  </Layout>
);

const Container = styled.div`
  .dashboard {
    display: flex;
    flex-direction: row;
    ${theme.respondTo.lg`
    flex-direction: column;
  `}
  }

  .markets {
    flex: 1;
    margin-left: 2rem;

    ${theme.respondTo.lg`
    margin-left: 0rem;
    margin-top: 2rem;
  `}
  }
`;

export default Dashboard;
