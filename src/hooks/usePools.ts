import { createSelector } from 'reselect';

import { PoolInfo, PoolOptions, TokenInfo } from '../services/Api';
import create, { GetState, SetState, State } from './createState';
import { AppState, useApp, useAppApi } from './useApp';

export interface PoolsState extends State {
  defaultPool?: PoolInfo | null;
  pools?: PoolInfo[];
  poolLiquidity: Record<string, string>;
  poolOptions: Record<string, PoolOptions>;
  initPool(poolId: PoolInfo['id']): Promise<void>;
  updatePoolTokenOptionsByToken(tokenId: TokenInfo['id']): Promise<void>;
  getPoolTokenOptions(poolId: PoolInfo['id'], tokenId: TokenInfo['id']): PoolOptions | null;
}

export const [usePools, usePoolsApi] = create<PoolsState>(
  (set: SetState<PoolsState>, get: GetState<PoolsState>): PoolsState => ({
    defaultPool: undefined,
    poolOptions: {},
    poolLiquidity: {},
    async initPool(poolId) {
      const { api } = useAppApi.getState();
      if (!api) throw new Error('api not found');
      const liquidity = await api.getLiquidity(poolId);

      const tokens = useAppApi.getState().tokens;
      const poolOptions: PoolsState['poolOptions'] = {};
      await Promise.all(
        tokens.map(token =>
          api.getPoolOptions(poolId, token.id).then(data => {
            poolOptions[`${poolId}//${token.id}`] = data;
          }),
        ),
      );
      set(state => {
        Object.assign(state.poolOptions, poolOptions);
        state.poolLiquidity[poolId] = liquidity;
        console.log(JSON.stringify(state.poolOptions));
      });
    },
    getPoolTokenOptions(poolId, tokenId) {
      return get().poolOptions[`${poolId}//${tokenId}`] || null;
    },
    async updatePoolTokenOptionsByToken(tokenId) {
      const { api } = useAppApi.getState();
      const { pools } = get();

      if (!api) throw new Error('api not found');
      if (!pools) throw new Error('pools not init');

      for (const pool of pools) {
        const [liquidity, data] = await Promise.all([api.getLiquidity(pool.id), api.getPoolOptions(pool.id, tokenId)]);

        set(state => {
          state.poolOptions[`${pool.id}//${tokenId}`] = data;
          state.poolLiquidity[pool.id] = liquidity;
        });
      }
    },
  }),
);

export const getPoolOptions = createSelector(
  (state: PoolsState) => state.defaultPool,
  (state: PoolsState) => state.poolOptions,
  (defaultPool, allOptions) => {
    const initValue = {} as Record<string, PoolOptions>;
    if (!defaultPool) return initValue;
    return Object.keys(allOptions)
      .filter(key => key.split('//')[0] === defaultPool.id)
      .reduce((result, key) => {
        const value = allOptions[key];
        result[value.tokenId] = value;
        return result;
      }, initValue);
  },
);

// useAppApi.subscribe<AppState['defaultPools']>(
//   async defaultPools => {
//     usePoolsApi.setState(state => (state.defaultPool = defaultPools ? defaultPools[0] : null));
//   },
//   state => state.defaultPools,
// );
