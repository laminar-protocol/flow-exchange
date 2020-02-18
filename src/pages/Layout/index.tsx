import { Layout as AntdLayout } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Spinner } from '../../components';
import { useApp } from '../../hooks/useApp';
import Prime from './Prime';
import SideBar from './SideBar';

const Layout: React.FC = ({ children }) => {
  const currentProvider = useApp(state => state.provider);
  const history = useHistory();

  useEffect(() => {
    if (!currentProvider) {
      console.log('history and currentProvider changed');
      // history.push('/');
    }
  }, [history, currentProvider]);

  return (
    <Container>
      <SideBar />
      <Prime>
        <Spinner size="large" className="layout__spinner" />
      </Prime>
    </Container>
  );
};

const Container = styled(AntdLayout)`
  .layout__spinner {
    margin-top: 300px;
    display: flex;
    justify-content: center;
  }
`;

export default Layout;
