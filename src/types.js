import getActionTypeCreators from 'helpers/typeCreator';

const ACTION_TYPES_NAME_SPACE = 'LF_EXCHANGE';

const {
  apiActionTypes,
  changedActionTypes,
  triggerActionTypes,
} = getActionTypeCreators(ACTION_TYPES_NAME_SPACE);

const actionTypes = {
  token: apiActionTypes('token'),
};

export default actionTypes;
