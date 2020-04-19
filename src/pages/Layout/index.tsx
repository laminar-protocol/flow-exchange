import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory, useLocation } from 'react-router-dom';

import { Layout, Spinner } from '../../components';
import { useApp } from '../../store/useApp';
import { useSetting } from '../../store/useSetting';
import Prime from './Prime';
import SideBar from './SideBar';

type LayoutProps = {
  loading?: boolean;
};

const PageLayout: React.FC<LayoutProps> = ({ loading = false, children }) => {
  const classes = useStyles();

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
    <Layout>
      <SideBar />
      <Prime>{loading ? <Spinner size="large" className={classes.spinner} /> : children}</Prime>
    </Layout>
  );
};

const useStyles = createUseStyles({
  spinner: {
    marginTop: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default PageLayout;
