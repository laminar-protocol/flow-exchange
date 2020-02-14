import { CurrencyData, Pool, Token } from '../services/types';
import create, { GetState, SetState, State } from './createState';
import { AppState, useAppApi } from './useApp';

export interface PoolsState extends State {
  defaultPool?: Pool;
  currentPools?: Pool[];
  currencyData: Record<string, CurrencyData>;
  getCurrencyData(poolId: Pool['id'], tokenId: Token['id']): CurrencyData | null;
  setCurrencyData(poolId: Pool['id'], tokenId: Token['id'], data: CurrencyData): void;
}

export const [usePools, usePoolsApi] = create<PoolsState>(
  (set: SetState<PoolsState>, get: GetState<PoolsState>): PoolsState => ({
    defaultPool: undefined,
    currentPools: undefined,
    currencyData: {},
    getCurrencyData(poolId: Pool['id'], tokenId: Token['id']) {
      const currencyData = get().currencyData;
      return currencyData[`/${poolId}/${tokenId}`] || null;
    },
    setCurrencyData(poolId: Pool['id'], tokenId: Token['id'], data: CurrencyData) {
      set(state => {
        state.currencyData[`/${poolId}/${tokenId}`] = data;
      });
    },
  }),
);

useAppApi.subscribe<AppState['provider']>(
  async provider => {
    if (provider) {
      const pools = await provider.api.getPools();
      usePoolsApi.setState(state => (state.defaultPool = pools[0]));
      usePoolsApi.setState(state => (state.currentPools = pools));
    }
  },
  state => state.provider,
);
