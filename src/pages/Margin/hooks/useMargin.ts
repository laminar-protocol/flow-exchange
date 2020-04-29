import create, { GetState, SetState, State } from '../../../store/createState';

export interface MarginState extends State {
  setState: SetState<MarginState>;
  allowance: string;
  positions: {
    positionId: string;
    hash: string;
    openedTime: number;
    isClosed: boolean;
    amt: string;
    openPrice: string;
    pair: {
      base: string;
      quote: string;
    };
    poolId: string;
    pairId: string;
    leverage: string;
    direction: string;
  }[];
}

export const [useMargin, useMarginApi, useMarginSelector] = create<MarginState>(
  (set: SetState<MarginState>, get: GetState<MarginState>): MarginState => ({
    setState: set,
    allowance: '',
    positions: [],
  }),
);

export default useMargin;
