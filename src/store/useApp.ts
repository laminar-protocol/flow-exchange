import Api, { Account, ChainType, MarginInfo, TraderInfo, PoolInfo, TokenInfo, MarginPoolInfo } from '../services/Api';
import create, { GetState, SetState, State } from './createState';
import { useSettingApi } from './useSetting';

export interface AppState extends State {
  api: Api;
  currentAccount: Account | null;
  accountList: Account[];
  availableProvider: ChainType[];
  connectModalShow: boolean;
  tokens: TokenInfo[];
  margin: {
    balance: string;
    marginInfo: MarginInfo;
    allPoolIds: string[];
    poolInfo: Record<string, MarginPoolInfo>;
    traderInfo: TraderInfo;
  };
  // poolOptions: any,
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
    margin: {
      balance: '0',
      marginInfo: {
        ellThreshold: {
          marginCall: 0,
          stopOut: 0,
        },
        enpThreshold: {
          marginCall: 0,
          stopOut: 0,
        },
      },
      allPoolIds: [],
      poolInfo: {},
      traderInfo: {
        equity: '0',
        freeMargin: '0',
        marginHeld: '0',
        marginLevel: '0',
        unrealizedPl: '0',
        traderThreshold: {
          marginCall: 0,
          stopOut: 0,
        },
      },
    },
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
        state.currentAccount = accounts[0];
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
