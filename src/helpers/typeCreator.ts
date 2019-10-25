import { map } from 'ramda';

const apiActionTypes = (prefix: string) => (
  {
    requested: `${prefix}_REQUESTED`,
    completed: `${prefix}_COMPLETED`,
    failed: `${prefix}_FAILED`,
    cancelled: `${prefix}_CANCELLED`,
  }
);

const changedActionTypes = (prefix: string) => (
  { changed: `${prefix}_CHANGED` }
);

const toggledActionTypes = (prefix: string) => (
  { toggled: `${prefix}_TOGGLED` }
);

const triggerActionTypes = (prefix: string) => (
  { trigger: `${prefix}_TOGGLED` }
);

const actionCreators = {
  apiActionTypes,
  changedActionTypes,
  toggledActionTypes,
  triggerActionTypes,
};

const prefixProvider = (namespace: string) => (actionTypeCreator: (prefix: string) => any) => (name: string) => {
  const prefix = `${namespace}_${name.toUpperCase()}`;

  return actionTypeCreator(prefix);
};

type ActionTypeCreator = { [P in keyof typeof actionCreators]: typeof actionCreators[P] };

const getActionTypeCreators = (namespace: string): ActionTypeCreator => {
  const providePrefix = prefixProvider(namespace);
  return map(providePrefix, actionCreators);
};

export default getActionTypeCreators;

export type ApiActionTypes = ReturnType<typeof apiActionTypes>;
