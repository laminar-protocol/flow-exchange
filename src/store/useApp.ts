import Api, { Account, ChainType, TokenInfo } from '../services/Api';
import create, { GetState, SetState, State } from './createState';
import { useSettingApi } from './useSetting';

export interface AppState extends State {
  api: Api;
  currentAccount: Account | null;
  accountList: Account[];
  availableProvider: ChainType[];
  connectModalShow: boolean;
  tokens: TokenInfo[];
  setApiEnable(chainType: ChainType): Promise<AppState['api']>;
  checkAvailableProvider(): ChainType[];
  setState: SetState<AppState>;
}

export const [useApp, useAppApi, useAppSelector] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    api: null as any,
    currentAccount: null,
    accountList: [],
    availableProvider: [],
    connectModalShow: false,
    tokens: [],
    checkAvailableProvider() {
      const anyWindow = window as any;
      const available = {
        ethereum: !!(anyWindow.ethereum || anyWindow.web3?.currentProvider),
        laminar: !!anyWindow.injectedWeb3,
      };

      return (Object.keys(available) as ChainType[]).filter(v => available[v]);
    },
    async setApiEnable(chainType) {
      const api = new Api({ chainType });

      await api.isReady();

      const accounts = await api.getAccounts();

      set(state => {
        state.api = api;
        const lastAccount = localStorage.getItem('LAST_LAMINAR_ACCOUNT');
        const findAccount = accounts.find(({ address }) => lastAccount === address);
        if (findAccount && chainType === 'laminar') {
          state.currentAccount = findAccount;
        } else {
          localStorage.removeItem('LAST_LAMINAR_ACCOUNT');
          state.currentAccount = accounts[0];
        }
        state.accountList = accounts;
      });

      const { setChainType } = useSettingApi.getState();

      setChainType(api.chainType);

      return api;
    },
    setState: set,
  }),
);

export default useApp;
