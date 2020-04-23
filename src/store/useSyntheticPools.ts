import { SyntheticPoolInfo } from '../services';
import create, { GetState, SetState, State } from './createState';

export interface SyntheticPoolsState extends State {
  ids: string[];
  poolInfo: Record<string, SyntheticPoolInfo>;
  setState: SetState<SyntheticPoolsState>;
}

export const [useSyntheticPools, useSyntheticPoolsApi, useSyntheticPoolsSelector] = create<SyntheticPoolsState>(
  (set: SetState<SyntheticPoolsState>, get: GetState<SyntheticPoolsState>): SyntheticPoolsState => ({
    ids: [],
    poolInfo: {},
    setState: set,
  }),
);

export default useSyntheticPools;
