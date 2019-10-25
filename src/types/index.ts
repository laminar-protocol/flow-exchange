import {
  apiActionTypes,
  changedActionTypes,
} from './actionTypeCreators';

import margin from './margin';

const actionTypes = {
  // Application
  applicationInit: changedActionTypes('application_init'),

  // Theme
  theme: changedActionTypes('theme'),

  // Symbols
  marketSymbols: changedActionTypes('market_symbols'),

  // Ethereum
  ethereumModalOpen: changedActionTypes('ethereum_modal_open'),
  ethereumModalClose: changedActionTypes('ethereum_modal_close'),
  ethereumEnable: apiActionTypes('ethereum_enable'),
  ethereumNetwork: apiActionTypes('ethereum_nework'),

  // Token
  tokenBalance: apiActionTypes('token_balance'),
  tokenAuthorization: apiActionTypes('token_authorization'),
  tokenGrant: apiActionTypes('token_grant'),

  // Swap
  swapFromSymbol: changedActionTypes('swap_from_symbol'),
  swapToSymbol: changedActionTypes('swap_to_symbol'),
  swapFromAmount: changedActionTypes('swap_from_amount'),
  swapToAmount: changedActionTypes('swap_to_amount'),
  swapValidation: changedActionTypes('swap_validation'),
  swapMint: apiActionTypes('swap_mint'),
  swapRedeem: apiActionTypes('swap_redeem'),

  // Spot exchange rate
  spotRate: apiActionTypes('spot_rate'),

  margin,
};

export default actionTypes;
