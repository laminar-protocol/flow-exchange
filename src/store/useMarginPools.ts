import { useState, useLayoutEffect } from 'react';
import { combineLatest } from 'rxjs';
import { useApi, useForceUpdate, useCurrentAccount } from '../hooks';
import { MarginInfo, MarginPoolInfo, TraderInfo } from '../services';
import create, { GetState, SetState } from './createState';

export interface MarginPoolsState {
  balance: string;
  marginInfo: MarginInfo;
  poolEntities: {
    byId: Record<string, MarginPoolInfo>;
    allIds: string[];
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
    setState: set,
  }),
);

export const useLoadPoolInfo = ({ variables: { poolId } }: { variables: { poolId: string } }) => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (poolId) {
      const s = api.margin.poolInfo(poolId).subscribe(result => {
        if (result) {
          setState(state => {
            state.poolEntities.byId[result.poolId] = result;
          });
        }
      });

      return () => s?.unsubscribe();
    }
  }, [api, poolId, setState, tick]);

  return { forceUpdate };
};

export const useQueryTraderInfo = ({
  variables: { poolId },
  lazy = false,
}: {
  variables: { poolId: string };
  lazy?: boolean;
}) => {
  const api = useApi();
  const { address } = useCurrentAccount();
  const [traderInfo, setTraderInfo] = useState<TraderInfo>();

  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    if (lazy && !tick) return;
    if (poolId) {
      const s = api.margin.traderInfo(address, poolId).subscribe(result => {
        setTraderInfo(result);
      });

      return () => s?.unsubscribe();
    }
  }, [api, address, poolId, tick, lazy]);

  return { forceUpdate, data: traderInfo };
};

export const useLoadMarginInfo = () => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    const subscription = api.margin.marginInfo().subscribe(result => {
      setState(state => {
        state.marginInfo = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, setState, tick]);

  return { forceUpdate };
};

export const useLoadPoolEntities = () => {
  const api = useApi();
  const setState = useMarginPools(state => state.setState);
  const allIds = useMarginPools(state => state.poolEntities.allIds);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    const subscription = api.margin.allPoolIds().subscribe(result => {
      setState(state => {
        state.poolEntities.allIds = result;
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, setState, tick]);

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
