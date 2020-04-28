import create, { GetState, SetState, State } from '../../store/createState';
import { TokenInfo } from '../../services';

export interface SwapState extends State {
  setState: SetState<SwapState>;
  baseToken?: TokenInfo;
  exchangeToken?: TokenInfo;
  isRedeem: boolean;
}

export const [useSwap, useSwapApi, useSwapSelector] = create<SwapState>(
  (set: SetState<SwapState>, get: GetState<SwapState>): SwapState => ({
    setState: set,
    baseToken: undefined,
    exchangeToken: undefined,
    isRedeem: false,
  }),
);

export default useSwap;
