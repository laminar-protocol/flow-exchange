import {
  moduleActions,
  appActions,
  appActionTypes,
  changedActionTypes,
  apiActionTypes,
  triggerActionTypes,
} from 'helpers/typeCreator';

import { PartialState } from 'helpers/apiLoadable';

const app = moduleActions('app', {
  init: triggerActionTypes<undefined>(),
  theme: changedActionTypes(),
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
  fromAmount: changedActionTypes(),
  toAmount: changedActionTypes(),
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

export const actions = appActions('flow', {
  app,
  ethereum,
  token,
  swap,
  margin,
});

const types = appActionTypes(actions);

export default types;
