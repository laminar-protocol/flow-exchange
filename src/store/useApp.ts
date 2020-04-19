import { createSelector } from 'reselect';

import Api, {
  Account,
  AppEthereumApi,
  AppLaminarApi,
  ChainType,
  MarginInfo,
  PoolInfo,
  TokenInfo,
  TradingPair,
  MarginPoolInfo,
} from '../services/Api';
import create, { GetState, SetState, State } from './createState';
import { useSettingApi } from './useSetting';

export interface AppState extends State {
  api: Api;
  currentAccount: Account | null;
  accountList: Account[];
  availableProvider: ChainType[];
  connectModalShow: boolean;
  tokens: TokenInfo[];
  tradingPairs: TradingPair[];
  defaultPools?: PoolInfo[];
  margin: {
    balance: string;
    marginInfo: MarginInfo;
    allPoolIds: string[];
    poolInfo: Record<string, MarginPoolInfo>;
    traderInfo: {
      equity: string;
      freeMargin: string;
      marginHeld: string;
      marginLevel: string;
      unrealizedPl: string;
    };
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
    tradingPairs: [],
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
        traderThreshold: {
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
      // const defaultPools = await api.getDefaultPools();
      const tradingPairs = await api.getTradingPairs();
      const accounts = await api.getAccounts();

      set(state => {
        state.api = api;
        // state.defaultPools = defaultPools;
        state.tradingPairs = tradingPairs;
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

export const apiSelector = createSelector(
  (state: AppState) => state.api,
  api => {
    if (!api) throw new Error('unexpected error');
    if (api.chainType === 'ethereum') {
      return api as AppEthereumApi;
    } else if (api.chainType === 'laminar') {
      return api as AppLaminarApi;
    }
    throw new Error('unexpected chaintype');
  },
);

export const tokenInfoMapSelector = createSelector(
  (state: AppState) => state.tokens,
  tokens => {
    return tokens.reduce((result, curr) => {
      result[curr.id] = curr;
      return result;
    }, {} as Record<string, TokenInfo>);
  },
);

export const baseTokenInfoSelector = createSelector(
  (state: AppState) => state.tokens,
  tokens => {
    const result = tokens.find(token => token.isBaseToken);
    if (!result) throw new Error('Base token not found');
    return result;
  },
);

export const isReadySelector = createSelector(
  (state: AppState) => state.api,
  api => {
    return !!api;
  },
);

export default useApp;
