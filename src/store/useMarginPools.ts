import { MarginInfo, MarginPoolInfo, TraderInfo } from '../services';
import create, { GetState, SetState, State } from './createState';

export interface MarginPoolsState extends State {
  allPoolIds: string[];
  balance: string;
  marginInfo: MarginInfo;
  poolInfo: Record<string, MarginPoolInfo>;
  traderInfo: TraderInfo;
  setState: SetState<MarginPoolsState>;
}

export const [useMarginPools, useMarginPoolsApi, useMarginPoolsSelector] = create<MarginPoolsState>(
  (set: SetState<MarginPoolsState>, get: GetState<MarginPoolsState>): MarginPoolsState => ({
    allPoolIds: [],
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
    setState: set,
  }),
);

export default useMarginPools;
