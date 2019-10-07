import getActionTypeCreators from 'helpers/typeCreator';

const ACTION_TYPES_NAME_SPACE = 'LF_EXCHANGE';

const {
  apiActionTypes,
  changedActionTypes,
} = getActionTypeCreators(ACTION_TYPES_NAME_SPACE);

const actionTypes = {
  token: apiActionTypes('token'),
  web3Init: changedActionTypes('token'),
};

export default actionTypes;
