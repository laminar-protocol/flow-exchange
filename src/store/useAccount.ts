import { useLayoutEffect } from 'react';
import { take } from 'rxjs/operators';
import { useForceUpdate } from '../hooks';
import { TokenBalance } from '../services';
import create, { GetState, SetState, State } from './createState';
import useAppStore from './useApp';

export interface AccountState extends State {
  balances: TokenBalance[];
  setBalances(data: TokenBalance[]): void;
  setState: SetState<AccountState>;
}

export const [useAccount, useAccountApi, useCurrentAccount] = create<AccountState>(
  (set: SetState<AccountState>, get: GetState<AccountState>): AccountState => ({
    balances: [],
    setBalances(data: TokenBalance[]) {
      set(state => {
        state.balances = data;
      });
    },
    setState: set,
  }),
);

export const useLoadAccountBalance = ({
  lazy = false,
  isQuery = false,
}: { lazy?: boolean; isQuery?: boolean } = {}) => {
  const currentApi = useAppStore(state => state.api);
  const currentAccount = useAppStore(state => state.currentAccount);
  const setBalances = useAccount(state => state.setBalances);

  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (lazy && !tick) return;

    if (currentApi?.currencies && currentAccount) {
      let $ = currentApi.currencies.balances(currentAccount.address);
      if (isQuery) $ = $.pipe(take(1));

      const s = $.subscribe(data => {
        setBalances(data);
      });

      return () => s && s.unsubscribe();
    }
  }, [lazy, isQuery, tick, currentApi, currentAccount, setBalances]);

  return { forceUpdate };
};

export default useAccount;
