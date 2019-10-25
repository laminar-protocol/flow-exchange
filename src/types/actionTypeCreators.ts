import getActionTypeCreators from 'helpers/typeCreator';

const ACTION_TYPES_NAME_SPACE = 'LF_EXCHANGE';

const {
  apiActionTypes,
  changedActionTypes,
  toggledActionTypes,
  triggerActionTypes,
} = getActionTypeCreators(ACTION_TYPES_NAME_SPACE);

export {
  apiActionTypes,
  changedActionTypes,
  toggledActionTypes,
  triggerActionTypes,
};