import Home from 'pages/Home';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation } from 'react-router-dom';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Layout, Spinner } from '../../components';
import useApp from '../../store/useApp';
import { useSetting } from '../../store/useSetting';
import Prime from './Prime';
import SideBar from './SideBar';

type LayoutProps = {
  loading?: boolean;
  isHome?: boolean;
};

const PageLayout: React.FC<LayoutProps> = ({ isHome, loading = false, children }) => {
  const classes = useStyles();

  const currentApi = useApp(state => state.api);
  const setApiEnable = useApp(state => state.setApiEnable);
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const accountList = useApp(state => state.accountList);
  const setting = useSetting(state => state.setting);

  const location = useLocation();
  const [needWallet, setNeedWallet] = useState(false);

  const handleConnect = useCallback(() => {
    const availableProvider = checkAvailableProvider();

    if (location.pathname === '/') return;

    if (currentApi) {
      if (!availableProvider.includes(currentApi.chainType)) {
        setNeedWallet(true);
      }
    } else {
      // eslint-disable-next-line
      if (setting.chainType && availableProvider.includes(setting.chainType)) {
        setApiEnable(setting.chainType);
      } else {
        setNeedWallet(true);
      }
    }
  }, [currentApi, checkAvailableProvider, setApiEnable, setting.chainType, location]);

  useEffect(() => {
    const subscription = timer(0, 100)
      .pipe(take(5))
      .subscribe(
        () => {
          const availableProvider = checkAvailableProvider();
          if (availableProvider.includes('laminar')) {
            subscription.unsubscribe();
            handleConnect();
          }
        },
        () => {
          handleConnect();
        },
        () => {
          handleConnect();
        },
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAvailableProvider, handleConnect]);

  let inner = loading ? <Spinner size="large" className={classes.spinner} /> : children;

  if (!isHome && needWallet) {
    inner = <Home />;
  }

  if (!isHome && !loading && !accountList.length) {
    inner = <div>At least one wallet account is required</div>;
  }

  if (!isHome && currentApi && currentApi.isEthereum) {
    if ((currentApi.asEthereum as any).apiProvider.web3._provider.networkVersion !== '42') {
      inner = <div>Flow protocol currently only supports the Kovan test network</div>;
    }
  }

  return (
    <Layout>
      <SideBar />
      <Prime>{inner}</Prime>
    </Layout>
  );
};

const useStyles = createUseStyles({
  spinner: {
    marginTop: '18.75rem',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default PageLayout;
