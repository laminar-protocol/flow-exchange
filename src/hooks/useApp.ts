import { createSelector } from 'reselect';

import Api, { Account, ChainType, PoolInfo, TokenInfo, TradingPair } from '../services/Api';
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
  setApiEnable(chainType: ChainType): Promise<AppState['api']>;
  checkAvailableProvider(): ChainType[];
}

export const [useApp, useAppApi] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    api: null as any,
    currentAccount: null,
    accountList: [],
    availableProvider: [],
    connectModalShow: false,
    tokens: [],
    tradingPairs: [],
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
      const defaultPools = await api.getDefaultPools();
      const tradingPairs = await api.getTradingPairs();
      const tokens = await api.getTokens();
      const accounts = await api.getAccounts();

      set(state => {
        state.api = api;
        state.defaultPools = defaultPools;
        state.tradingPairs = tradingPairs;
        state.tokens = tokens;
        state.currentAccount = accounts[0];
        state.accountList = accounts;
      });

      const { setChainType } = useSettingApi.getState();

      setChainType(api.chainType);

      return api;
    },
  }),
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
    return tokens.find(token => token.isBaseToken);
  },
);

export const isReadySelector = createSelector(
  (state: AppState) => state.api,
  api => {
    return !!api;
  },
);
