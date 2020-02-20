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
  const currentProvider = useApp(state => state.provider);
  const setProviderEnable = useApp(state => state.setProviderEnable);
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const setting = useSetting(state => state.setting);

  const [loadingProvider, setLoadingProvider] = useState();
  const history = useHistory();

  useEffect(() => {
    const availableProvider = checkAvailableProvider();

    console.log('history and currentProvider changed');
    console.log(currentProvider, setting.provider);
    if (currentProvider) {
      if (!availableProvider.includes(currentProvider.impl)) {
        history.push('/');
      }
    } else {
      if (setting.provider && availableProvider.includes(setting.provider)) {
        setLoadingProvider(true);
        const provider = setProviderEnable(setting.provider).finally(() => {
          setLoadingProvider(false);
        });
      } else {
        history.push('/');
      }
    }
  }, [history, currentProvider, checkAvailableProvider, setProviderEnable, setting.provider]);

  return (
    <Container>
      <SideBar />
      <Prime>{loadingProvider ? <Spinner size="large" className="layout__spinner" /> : children}</Prime>
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
