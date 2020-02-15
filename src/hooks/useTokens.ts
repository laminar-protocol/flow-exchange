import BN from 'bn.js';

import { Token } from '../types';
import create, { GetState, SetState, State } from './createState';
import { AppState, useAppApi } from './useApp';

export interface TokensState extends State {
  currentTokens: null | Token[];
  currentBalances: Record<Token['name'], BN>;
  setCurrentBalance(tokenName: Token['name'], value: BN): void;
  updateBalances(): Promise<void>;
}

export const [useTokens, useTokensApi] = create<TokensState>(
  (set: SetState<TokensState>, get: GetState<TokensState>): TokensState => ({
    currentTokens: null,
    currentBalances: {},
    setCurrentBalance(tokenName: Token['name'], value: BN) {
      set(state => {
        state.currentBalances[tokenName] = value;
      });
    },
    async updateBalances() {
      const api = useAppApi.getState().provider?.api;
      const currentAccount = useAppApi.getState().currentAccount;
      const currentTokens = get().currentTokens;
      const setBalance = get().setCurrentBalance;
      if (api && currentAccount && currentTokens && setBalance) {
        await Promise.all(
          currentTokens.map(token => {
            return api.getBalance(currentAccount.address, token.name).then(result => {
              setBalance(token.name, result);
            });
          }),
        );
      }
    },
  }),
);

useAppApi.subscribe<AppState['provider']>(
  provider => {
    if (provider) {
      useTokensApi.setState(state => (state.currentTokens = provider?.api.tokens));
    }
  },
  state => state.provider,
);
