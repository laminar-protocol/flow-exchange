import getActionTypeCreators from 'helpers/typeCreator';

const ACTION_TYPES_NAME_SPACE = 'LF_EXCHANGE';

const {
  apiActionTypes,
  changedActionTypes,
} = getActionTypeCreators(ACTION_TYPES_NAME_SPACE);

const actionTypes = {
  // Application
  applicationInit: changedActionTypes('application_init'),

  // Theme
  theme: changedActionTypes('theme'),

  // Symbols
  symbols: changedActionTypes('symbols'),

  // Ethereum
  ethereumModalOpen: changedActionTypes('ethereum_modal_open'),
  ethereumModalClose: changedActionTypes('ethereum_modal_close'),
  ethereumEnable: apiActionTypes('ethereum_enable'),
  ethereumNetwork: apiActionTypes('ethereum_nework'),

  // DAI
  daiBalance: apiActionTypes('dai_balance'),
  daiAuthorization: apiActionTypes('dai_authorization'),
  daiGrant: apiActionTypes('dai_grant'),

  // EUR
  eurBalance: apiActionTypes('eur_balance'),
  eurAuthorization: apiActionTypes('eur_authorization'),
  eurGrant: apiActionTypes('eur_grant'),

  // JPY
  jpyBalance: apiActionTypes('jpy_balance'),
  jpyAuthorization: apiActionTypes('jpy_authorization'),
  jpyGrant: apiActionTypes('jpy_grant'),

  // Swap
  swapFromSymbol: changedActionTypes('swap_from_symbol'),
  swapToSymbol: changedActionTypes('swap_to_symbol'),
  swapFromAmount: changedActionTypes('swap_from_amount'),
  swapToAmount: changedActionTypes('swap_to_amount'),
  swap: apiActionTypes('swap'),
};

export default actionTypes;
