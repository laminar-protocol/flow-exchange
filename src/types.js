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
  marketSymbols: changedActionTypes('market_symbols'),

  // Ethereum
  ethereumModalOpen: changedActionTypes('ethereum_modal_open'),
  ethereumModalClose: changedActionTypes('ethereum_modal_close'),
  ethereumEnable: apiActionTypes('ethereum_enable'),
  ethereumNetwork: apiActionTypes('ethereum_nework'),

  // Flow
  flowMoneyMarket: apiActionTypes('flow_money_market'),
  flowOracle: apiActionTypes('flow_oracle'),

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
  swap: apiActionTypes('swap'),

  // Spot exchange rate
  spotRate: apiActionTypes('spot_rate'),
};

export default actionTypes;
