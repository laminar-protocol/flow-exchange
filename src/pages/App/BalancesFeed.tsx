import React, { useLayoutEffect } from 'react';

import useApp from '../../store/useApp';
import useAccount from '../../store/useAccount';

const BalancesFeed: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const currentAccount = useApp(state => state.currentAccount);
  const setBalances = useAccount(state => state.setBalances);

  useLayoutEffect(() => {
    if (currentApi?.balances && currentAccount) {
      const s = currentApi.balances(currentAccount.address).subscribe((data: any) => {
        setBalances(data);
      });

      return () => s && s.unsubscribe();
    }
  }, [currentApi, currentAccount, setBalances]);

  return null;
};

export default BalancesFeed;
