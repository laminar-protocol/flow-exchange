import { Layout as AntdLayout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Spinner } from '../../components';
import { useApp } from '../../hooks/useApp';
import { useSetting } from '../../hooks/useSetting';
import Prime from './Prime';
import SideBar from './SideBar';

const Layout: React.FC = ({ children }) => {
  const currentApi = useApp(state => state.api);
  const setApiEnable = useApp(state => state.setApiEnable);
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const setting = useSetting(state => state.setting);

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const availableProvider = checkAvailableProvider();

    console.log('history and currentApi changed');

    if (currentApi) {
      if (!availableProvider.includes(currentApi.chainType)) {
        history.push('/');
      }
    } else {
      // eslint-disable-next-line
      if (setting.chainType && availableProvider.includes(setting.chainType)) {
        setLoading(true);
        setApiEnable(setting.chainType).finally(() => {
          setLoading(false);
        });
      } else {
        history.push('/');
      }
    }
  }, [history, currentApi, checkAvailableProvider, setApiEnable, setting.chainType]);

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
