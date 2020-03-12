import { createSelector } from 'reselect';
import store from 'store';

import { PoolInfo, PoolOptions, TokenInfo } from '../services/Api';
import create, { GetState, SetState, State } from './createState';
import { useAppApi } from './useApp';

export interface PoolsState extends State {
  defaultPool: PoolInfo | null;
  defaultPools: PoolInfo[];
  customPools: PoolInfo[];
  poolLiquidity: Record<string, string>;
  poolOptions: Record<string, PoolOptions>;
  initPool(poolId: PoolInfo['id']): Promise<void>;
  updatePoolTokenOptionsByToken(tokenId: TokenInfo['id']): Promise<void>;
  getPoolTokenOptions(poolId: PoolInfo['id'], tokenId: TokenInfo['id']): PoolOptions | null;
  addCustomPool(poolInfo: PoolInfo): void;
  deleteCustomPool(poolId: PoolInfo['id'], poolName: PoolInfo['name']): void;
  queryCustomPools(): PoolInfo[];
  getCustomPoolKey(): string;
}

export const [usePools, usePoolsApi, usePoolsSelector] = create<PoolsState>(
  (set: SetState<PoolsState>, get: GetState<PoolsState>): PoolsState => ({
    defaultPool: null,
    poolOptions: {},
    defaultPools: [],
    customPools: [],
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
        for (const id of Object.keys(poolOptions)) {
          state.poolOptions[id] = poolOptions[id];
        }
        state.poolLiquidity[poolId] = liquidity;
      });
    },
    getPoolTokenOptions(poolId, tokenId) {
      return get().poolOptions[`${poolId}//${tokenId}`] || null;
    },
    addCustomPool(poolInfo) {
      set(state => {
        const { getCustomPoolKey, queryCustomPools } = get();
        const preCustomPools = queryCustomPools();
        const customPools = preCustomPools.concat(poolInfo);
        store.set(getCustomPoolKey(), customPools);
        state.customPools = customPools;
      });
    },
    deleteCustomPool(poolId, poolName) {
      const { getCustomPoolKey, queryCustomPools } = get();
      const preCustomPools = queryCustomPools();
      const customPools = preCustomPools.filter(({ id, name }) => {
        return id !== poolId || name !== poolName;
      });
      store.set(getCustomPoolKey(), customPools);
      set(state => {
        state.customPools = customPools;
      });
    },
    queryCustomPools() {
      const { getCustomPoolKey } = get();
      return store.get(getCustomPoolKey()) || [];
    },
    getCustomPoolKey() {
      const { api } = useAppApi.getState();
      return `${api.chainType}-CustomPools`;
    },
    async updatePoolTokenOptionsByToken(tokenId) {
      const { api } = useAppApi.getState();
      const pools = poolsSelector(get());

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

export const getPoolDetail = (
  poolId: string | null | undefined,
  allOptions: PoolsState['poolOptions'],
  poolLiquidity: PoolsState['poolLiquidity'],
  pools: PoolInfo[],
) => {
  const initValue = {} as Record<string, PoolOptions>;
  const options = Object.keys(allOptions)
    .filter(key => key.split('//')[0] === poolId)
    .reduce((result, key) => {
      const value = allOptions[key];
      result[value.tokenId] = value;
      return result;
    }, initValue);

  const poolInfo = pools.find(({ id }) => {
    return poolId === id;
  });

  if (!poolInfo) return null;
  if (!poolId || !poolLiquidity[poolId]) return null;
  console.log(poolLiquidity[poolId], 'getPoolDetail');
  return {
    liquidity: poolLiquidity[poolId],
    options,
    ...poolInfo,
  };
};

export const poolsSelector = createSelector(
  (state: PoolsState) => state.defaultPools,
  (state: PoolsState) => state.customPools,
  (defaultPools, customPools) => {
    console.log('selector');
    return [...defaultPools, ...customPools];
  },
);

export const defaultPoolDetailSelector = createSelector(
  (state: PoolsState) => state.defaultPool && state.defaultPool.id,
  (state: PoolsState) => state.poolOptions,
  (state: PoolsState) => state.poolLiquidity,
  poolsSelector,
  getPoolDetail,
);

export const poolDetailSelector = (id: string) => {
  return createSelector(
    (state: PoolsState) => id,
    (state: PoolsState) => state.poolOptions,
    (state: PoolsState) => state.poolLiquidity,
    poolsSelector,
    getPoolDetail,
  );
};
