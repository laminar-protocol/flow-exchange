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

  // Ethereum
  ethereumModalOpen: changedActionTypes('ethereum_modal_open'),
  ethereumModalClose: changedActionTypes('ethereum_modal_close'),
  ethereumEnable: apiActionTypes('ethereum_enable'),
  ethereumNetwork: apiActionTypes('ethereum_nework'),

  // DAI
  daiBalance: apiActionTypes('dai_balance'),
  daiAuthorization: apiActionTypes('dai_authorization'),
  daiGrant: apiActionTypes('dai_grant'),
};

export default actionTypes;
