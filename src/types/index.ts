import {
  changedActionTypes,
  moduleActionTypes,
  apiActionTypes,
  appActionTypes,
  triggerActionTypes,
} from 'helpers/typeCreator';

const app = moduleActionTypes('app', {
  init: triggerActionTypes,
  theme: changedActionTypes,
});

const market = moduleActionTypes('market', {
  symbols: changedActionTypes,
});

const ethereum = moduleActionTypes('ethereum', {
  modalOpen: changedActionTypes,
  modalClose: changedActionTypes,
  enable: apiActionTypes,
  network: apiActionTypes,
});

const token = moduleActionTypes('token', {
  balance: apiActionTypes,
  authorization: apiActionTypes,
  grant: apiActionTypes,
});

const swap = moduleActionTypes('swap', {
  fromSymbol: changedActionTypes,
  toSymbol: changedActionTypes,
  fromAmount: changedActionTypes,
  toAmount: changedActionTypes,
  validation: changedActionTypes,
  mint: apiActionTypes,
  redeem: apiActionTypes,
});

const spot = moduleActionTypes('spot', {
  rate: apiActionTypes,
});

const margin = moduleActionTypes('margin', {
  enabled: apiActionTypes,
});

export default appActionTypes('flow', {
  app,
  market,
  ethereum,
  token,
  swap,
  spot,
  margin,
});
