import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Layout as AntdLayout } from 'antd';
import { Spinner } from '../../components';
import { useApp } from '../../hooks/useApp';
import { useSetting } from '../../hooks/useSetting';
import Prime from './Prime';
import SideBar from './SideBar';

type LayoutProps = {
  loading?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ loading = false, children }) => {
  const currentApi = useApp(state => state.api);
  const setApiEnable = useApp(state => state.setApiEnable);
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const setting = useSetting(state => state.setting);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const availableProvider = checkAvailableProvider();

    if (location.pathname === '/') return;

    if (currentApi) {
      if (!availableProvider.includes(currentApi.chainType)) {
        history.push('/');
      }
    } else {
      // eslint-disable-next-line
      if (setting.chainType && availableProvider.includes(setting.chainType)) {
        setApiEnable(setting.chainType);
      } else {
        history.push('/');
      }
    }
  }, [history, currentApi, checkAvailableProvider, setApiEnable, setting.chainType, location]);

  return (
    <Container>
      <SideBar />
      <Prime>{loading ? <Spinner size="large" className="layout__spinner" /> : children}</Prime>
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
