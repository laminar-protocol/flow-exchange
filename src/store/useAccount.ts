import { TokenBalance } from '../services';
import create, { GetState, SetState, State } from './createState';

export interface AccountState extends State {
  data: TokenBalance[];
  setBalances(data: TokenBalance[]): void;
  setState: SetState<AccountState>;
}

export const [useAccount, useAccountApi, useCurrentAccount] = create<AccountState>(
  (set: SetState<AccountState>, get: GetState<AccountState>): AccountState => ({
    data: [],
    setBalances(data: TokenBalance[]) {
      set(state => {
        state.data = data;
      });
    },
    setState: set,
  }),
);

export default useAccount;
