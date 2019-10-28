import {
  moduleActions,
  appActions,
  appActionTypes,
  changedActionTypes,
  apiActionTypes,
  triggerActionTypes,
} from 'helpers/typeCreator';

const app = moduleActions('app', {
  init: triggerActionTypes<undefined>(),
  theme: changedActionTypes(),
});

const market = moduleActions('market', {
  symbols: changedActionTypes<string>(),
});

const ethereum = moduleActions('ethereum', {
  modalOpen: changedActionTypes(),
  modalClose: changedActionTypes(),
  enable: apiActionTypes(),
  network: apiActionTypes(),
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

const spot = moduleActions('spot', {
  rate: apiActionTypes(),
});

const margin = moduleActions('margin', {
  enabled: apiActionTypes(),
});

export const actions = appActions('flow', {
  app,
  market,
  ethereum,
  token,
  swap,
  spot,
  margin,
});

const types = appActionTypes(actions);

export default types;
