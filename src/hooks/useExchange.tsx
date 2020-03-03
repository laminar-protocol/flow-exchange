import validate from 'validate.js';

import { TokenInfo } from '../services/Api';
import { calcExchangeRate } from '../utils';
import create, { SetState, State } from './createState';
import { AppState, useAppApi } from './useApp';

const valdateExchangeInput = (fromAmount: string, toAmount: string) => {
  const attributes = { fromAmount, toAmount };
  const constraints = {
    fromAmount: {
      presence: true,
      numericality: {
        greaterThan: 0,
      },
    },
    toAmount: {
      presence: {
        allowEmpty: true,
      },
      numericality: {
        greaterThanOrEqualTo: 0,
      },
    },
  };
  const result = validate(attributes, constraints);
  if (result) {
    return {
      error: {
        message: result && result.message,
      },
    };
  }
  return {
    result: true,
  };
};

export interface ExchangeState extends State {
  flowTokens?: TokenInfo[];
  baseTokens?: TokenInfo[];
  fromToken?: TokenInfo;
  toToken?: TokenInfo;
  fromAmount: string;
  toAmount: string;
  isRedeem: boolean;
  isValid: boolean;
  isSwapping: boolean;
  onFromTokenChange(token: TokenInfo): void;
  onToTokenChange(token: TokenInfo): void;
  onFromAmountChange(amount: string, rate?: number, spread?: number): void;
  onToAmountChange(amount: string, rate?: number, spread?: number): void;
  onSwapToken(fromToken: TokenInfo, toToken: TokenInfo, fromAmount?: string, toAmount?: string): void;
  onFetchLiquidityPoolSpread(otherToken: TokenInfo): void;
}

export const [useExchange, useExchangeApi] = create<ExchangeState>(
  (set: SetState<ExchangeState>): ExchangeState => ({
    flowTokens: undefined,
    baseTokens: undefined,
    fromToken: undefined,
    toToken: undefined,
    fromAmount: '',
    toAmount: '',
    isRedeem: false,
    isValid: false,
    isSwapping: false,
    onFromTokenChange(token: TokenInfo) {
      set(state => {
        [state.fromAmount, state.toAmount, state.fromToken] = ['', '', token];
      });
    },
    onToTokenChange(token: TokenInfo) {
      set(state => {
        [state.toAmount, state.fromAmount, state.toToken] = ['', '', token];
      });
    },
    onFromAmountChange(amount: string, rate?: number, spread?: number) {
      set(state => {
        state.fromAmount = amount;
        if (rate !== undefined && spread !== undefined) {
          state.toAmount = calcExchangeRate(Number(amount), spread, rate, 'bid');
        }
        if (valdateExchangeInput(state.fromAmount, state.toAmount).result) {
          state.isValid = true;
        } else {
          state.isValid = false;
        }
      });
    },
    onToAmountChange(amount: string, rate?: number, spread?: number) {
      set(state => {
        state.toAmount = amount;
        if (rate !== undefined && spread !== undefined) {
          state.fromAmount = calcExchangeRate(Number(amount), spread, rate, 'ask');
        }

        if (valdateExchangeInput(state.fromAmount, state.toAmount).result) {
          state.isValid = true;
        } else {
          state.isValid = false;
        }
      });
    },
    onSwapToken(fromToken: TokenInfo, toToken: TokenInfo, fromAmount: string, toAmount: string) {
      set(state => {
        [state.fromToken, state.toToken, state.fromAmount, state.toAmount] = [toToken, fromToken, toAmount, fromAmount];
        state.isRedeem = !state.isRedeem;
      });
    },
    onFetchLiquidityPoolSpread(otherToken: TokenInfo) {
      set(() => {
        console.log(otherToken);
        // dispatch(actions.liquidityPool.spread.requested({ id: [defaultPool, tokens[otherToken].address] }));
      });
    },
  }),
);

useAppApi.subscribe<AppState['tokens']>(
  tokens => {
    if (tokens && tokens.length) {
      useExchangeApi.setState(state => {
        state.baseTokens = tokens.filter(token => token.isBaseToken);
        state.flowTokens = tokens.filter(token => !token.isBaseToken && !token.isNetworkToken);
        state.fromToken = state.baseTokens[0];
        state.toToken = state.flowTokens[0];
      });
    }
  },
  state => state.tokens,
);
