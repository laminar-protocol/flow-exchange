import { useLayoutEffect } from 'react';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { useApi, useForceUpdate } from '../hooks';
import { SyntheticPoolInfo } from '../services';
import create, { GetState, SetState, State } from './createState';

export interface SyntheticPoolsState extends State {
  poolEntities: {
    byId: Record<string, SyntheticPoolInfo>;
    allIds: string[];
  };
  setState: SetState<SyntheticPoolsState>;
}

export const [useSyntheticPools, useSyntheticPoolsApi, useSyntheticPoolsSelector] = create<SyntheticPoolsState>(
  (set: SetState<SyntheticPoolsState>, get: GetState<SyntheticPoolsState>): SyntheticPoolsState => ({
    poolEntities: {
      byId: {},
      allIds: [],
    },
    setState: set,
  }),
);

export const useLoadPoolEntities = ({ lazy = false, isQuery = false }: { lazy?: boolean; isQuery?: boolean } = {}) => {
  const api = useApi();
  const setState = useSyntheticPools(state => state.setState);
  const allIds = useSyntheticPools(state => state.poolEntities.allIds);
  const [tick, forceUpdate] = useForceUpdate();

  useLayoutEffect(() => {
    let $ = api.synthetic.allPoolIds();

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
        return api.synthetic.poolInfo(poolId);
      }),
    ).subscribe(result => {
      setState(state => {
        for (const item of result) {
          if (item) {
            state.poolEntities.byId[item.poolId] = item;
          }
        }
      });
    });

    return () => subscription?.unsubscribe();
  }, [api, allIds, setState, tick]);

  return { forceUpdate };
};

export default useSyntheticPools;
