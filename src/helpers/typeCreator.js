import { map } from 'ramda';

const prefixProvider = (namespace) => (actionTypeCreator) => (name) => {
  const prefix = `${namespace}_${name.toUpperCase()}`;

  return actionTypeCreator(prefix);
};

const apiActionTypes = (prefix) => (
  {
    requested: `${prefix}_REQUESTED`,
    completed: `${prefix}_COMPLETED`,
    failed: `${prefix}_FAILED`,
    cancelled: `${prefix}_CANCELLED`,
  }
);

const changedActionTypes = (prefix) => (
  { changed: `${prefix}_CHANGED` }
);

const toggledActionTypes = (prefix) => (
  { toggled: `${prefix}_TOGGLED` }
);

const triggerActionTypes = (prefix) => (
  { trigger: `${prefix}_TOGGLED` }
);

const getActionTypeCreators = (namespace) => {
  if (!namespace) {
    throw new Error('Please give valid namespace');
  }
  const providePrefix = prefixProvider(namespace);
  return map(providePrefix, {
    apiActionTypes,
    changedActionTypes,
    toggledActionTypes,
    triggerActionTypes,
  });
};

export default getActionTypeCreators;
