import create, { GetState, SetState, State } from '../../../store/createState';
import { TokenInfo, TokenId } from '../../../services';

export interface SwapState extends State {
  setState: SetState<SwapState>;
  baseToken?: TokenInfo;
  exchangeToken?: TokenInfo;
  isRedeem: boolean;
  selectPoolId?: string;
  tokensAllowance: Record<TokenId, string>;
  txRecords: {
    txHash: string;
    action: string;
    time: string;
    fToken: string;
    baseToken: string;
    fAmount: string;
    baseAmount: string;
  }[];
  // count
  tokensAllowanceUpdate: number;
}

export const [useSwap, useSwapApi, useSwapSelector] = create<SwapState>(
  (set: SetState<SwapState>, get: GetState<SwapState>): SwapState => ({
    setState: set,
    baseToken: undefined,
    exchangeToken: undefined,
    isRedeem: false,
    selectPoolId: '',
    tokensAllowance: {},
    tokensAllowanceUpdate: 0,
    txRecords: [],
  }),
);

export default useSwap;
