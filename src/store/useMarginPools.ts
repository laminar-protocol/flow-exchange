import { useLayoutEffect } from 'react';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { useApi, useCurrentAccount, useForceUpdate } from '../hooks';
import { MarginInfo, MarginPoolInfo, TraderInfo } from '../services';
import create, { GetState, SetState } from './createState';

export interface MarginPoolsState {
  balance: string;
  marginInfo: MarginInfo;
  poolEntities: {
    byId: Record<string, MarginPoolInfo>;
    allIds: string[];
  };
  traderEntities: {
    byId: Record<string, TraderInfo>;
  };
  setState: SetState<MarginPoolsState>;
}

export const [useMarginPools, useMarginPoolsApi, useMarginPoolsSelector] = create<MarginPoolsState>(
  (set: SetState<MarginPoolsState>, get: GetState<MarginPoolsState>): MarginPoolsState => ({
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
    poolEntities: {
      byId: {},
      allIds: [],
    },
    traderEntities: {
      byId: {},
    },
    setState: set,
  }),
);

export const useLoadPoolInfo = ({
  variables: { poolId },
  lazy = false,
  isQuery = false,
}: {
  variables: { poolId: string };
  lazy?: boolean;
  isQuery?: boolean;
}) => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (lazy && !tick) return;

    if (poolId) {
      let $ = api.margin.poolInfo(poolId);

      if (isQuery) $ = $.pipe(take(1));

      const s = $.subscribe(result => {
        if (result) {
          setState(state => {
            state.poolEntities.byId[result.poolId] = result;
          });
        }
      });

      return () => s?.unsubscribe();
    }
  }, [api, poolId, setState, tick, lazy, isQuery]);

  return { forceUpdate };
};

export const useLoadTraderInfo = ({
  variables: { poolId },
  lazy = false,
  isQuery = false,
}: {
  variables: { poolId: string };
  lazy?: boolean;
  isQuery?: boolean;
}) => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const { address } = useCurrentAccount();

  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (lazy && !tick) return;
    if (poolId) {
      let $ = api.margin.traderInfo(address, poolId);

      if (isQuery) $ = $.pipe(take(1));

      const id = `${address}/${poolId}`;

      const s = $.subscribe(result => {
        setState(state => {
          state.traderEntities.byId[id] = result;
        });
      });

      return () => s?.unsubscribe();
    }
  }, [api, setState, address, poolId, tick, lazy, isQuery]);

  return { forceUpdate };
};

export const useLoadMarginInfo = ({ lazy = false, isQuery = false }: { lazy?: boolean; isQuery?: boolean } = {}) => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (lazy && !tick) return;

    let $ = api.margin.marginInfo();

    if (isQuery) $ = $.pipe(take(1));

    const s = $.subscribe(result => {
      setState(state => {
        state.marginInfo = result;
      });
    });

    return () => s?.unsubscribe();
  }, [api, setState, tick, lazy, isQuery]);

  return { forceUpdate };
};

export const useLoadMarginBalance = ({ lazy = false, isQuery = false }: { lazy?: boolean; isQuery?: boolean } = {}) => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const { address } = useCurrentAccount();

  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (lazy && !tick) return;

    let $ = api.margin.balance(address);

    if (isQuery) $ = $.pipe(take(1));

    const s = $.subscribe(result => {
      setState(state => {
        state.balance = result;
      });
    });

    return () => s?.unsubscribe();
  }, [api, setState, tick, lazy, isQuery, address]);

  return { forceUpdate };
};

export const useLoadPoolEntities = ({ lazy = false, isQuery = false }: { lazy?: boolean; isQuery?: boolean } = {}) => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const allIds = useMarginPools(state => state.poolEntities.allIds);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    let $ = api.margin.allPoolIds();

    if (isQuery) $ = $.pipe(take(1));

    const s = $.subscribe(result => {
      setState(state => {
        state.poolEntities.allIds = result;
      });
    });

    return () => s?.unsubscribe();
  }, [api, setState, tick, lazy, isQuery]);

  useLayoutEffect(() => {
    const subscription = combineLatest(
      allIds.map(poolId => {
        return api.margin.poolInfo(poolId);
      }),
    ).subscribe(result => {
      for (const item of result) {
        setState(state => {
          if (item) {
            state.poolEntities.byId[item.poolId] = item;
          }
        });
      }
    });

    return () => subscription?.unsubscribe();
  }, [api, allIds, setState, tick]);

  return { forceUpdate };
};

export default useMarginPools;
