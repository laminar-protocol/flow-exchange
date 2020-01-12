import {
  moduleActions,
  appActions,
  appActionTypes,
  changedActionTypes,
  apiActionTypes,
  triggerActionTypes,
} from 'helpers/typeCreator';

import { PartialState } from 'helpers/apiLoadableSingle';
import { PartialStateWithId } from 'helpers/apiLoadable';

const app = moduleActions('app', {
  init: triggerActionTypes<undefined>(),
  theme: changedActionTypes<string>(),
});

const ethereum = moduleActions('ethereum', {
  modalOpen: changedActionTypes(),
  modalClose: changedActionTypes(),
  enable: apiActionTypes<string>(),
  network: apiActionTypes(),
  account: changedActionTypes<string>(),
});

const token = moduleActions('token', {
  balance: apiActionTypes(),
  authorization: apiActionTypes(),
  grant: apiActionTypes(),
});

const swap = moduleActions('swap', {
  fromSymbol: changedActionTypes<string>(),
  toSymbol: changedActionTypes<string>(),
  fromAmount: changedActionTypes<string>(),
  toAmount: changedActionTypes<string>(),
  validation: changedActionTypes(),
  mint: apiActionTypes(),
  redeem: apiActionTypes(),
});

const margin = moduleActions('margin', {
  allowance: apiActionTypes<PartialState<number>>(),
  toggleTrading: apiActionTypes<PartialState<number, boolean>>(),
  openPosition: apiActionTypes<PartialState<void, { name: string; amount: number; pool: string }>>(),
  closePosition: apiActionTypes<PartialState<void, { name: string; id: string }>>(),
});

const liquidityPool = moduleActions('liquidityPool', {
  spread: apiActionTypes<PartialStateWithId<{ ask: number; bid: number }, [string, string]>>(),
  available: apiActionTypes<PartialStateWithId<string, string>>(),
});

const faucet = moduleActions('faucet', {
  dai: apiActionTypes(),
});

export const actions = appActions('flow', {
  app,
  ethereum,
  token,
  swap,
  margin,
  liquidityPool,
  faucet,
});

const types = appActionTypes(actions);

export default types;
