import { pipe, map, fromPairs, mapObjIndexed } from 'ramda';
import { Action as ReduxAction } from 'redux';

export interface Action<T> extends ReduxAction<string> {
  payload?: T;
}

export type ActionCreator<T> = (payload?: T) => Action<T>;

interface GetActionTypeResult<TActionTypeKeys extends string, TPayload> {
  (prefix: string): Record<TActionTypeKeys, ActionCreator<TPayload>>;
}

export const getActionType = <TActionTypeKeys extends string>(keys: readonly TActionTypeKeys[]) => <TPayload>() => (
  prefix: string,
): Record<TActionTypeKeys, ActionCreator<TPayload>> =>
  pipe(
    map((k: TActionTypeKeys) => [k, (payload: TPayload) => ({ type: `${prefix}/${k}`, payload })]),
    fromPairs as () => Record<TActionTypeKeys, ActionCreator<TPayload>>,
  )(keys);

type GetActionTypeReturnType<T> = T extends GetActionTypeResult<infer TActionTypeKeys, infer TPayload>
  ? Record<TActionTypeKeys, ActionCreator<TPayload>>
  : never;

export const moduleActions = <ModuleActionTypes extends Record<string, GetActionTypeResult<string, any>>>(
  modulePrefix: string,
  actions: ModuleActionTypes,
) => (parentPrefix: string): { [K in keyof ModuleActionTypes]: GetActionTypeReturnType<ModuleActionTypes[K]> } =>
  mapObjIndexed((val, key) => val(`${parentPrefix}/${modulePrefix}/${key}`), actions) as any;

export const appActions = <AppActionTypes extends Record<string, (prefix: string) => any>>(
  appPrefix: string,
  types: AppActionTypes,
): { [K in keyof AppActionTypes]: ReturnType<AppActionTypes[K]> } => mapObjIndexed(val => val(appPrefix), types) as any;

export const appActionTypes = <AppActions extends Record<string, Record<string, Record<string, ActionCreator<any>>>>>(
  actions: AppActions,
): {
  [K in keyof AppActions]: {
    [K2 in keyof AppActions[K]]: { [K3 in keyof AppActions[K][K2]]: ReturnType<AppActions[K][K2][K3]>['type'] };
  };
} => mapObjIndexed(mapObjIndexed(mapObjIndexed(x => x().type)), actions) as any;

const ApiActionTypes = ['requested', 'completed', 'failed', 'cancelled'] as const;

const ChangedActionTypes = ['changed'] as const;

const ToggledActionTypes = ['toggled'] as const;

const TriggerActionTypes = ['trigger'] as const;

export const apiActionTypes = getActionType(ApiActionTypes);
export const changedActionTypes = getActionType(ChangedActionTypes);
export const toggledActionTypes = getActionType(ToggledActionTypes);
export const triggerActionTypes = getActionType(TriggerActionTypes);

export type ApiActionTypesRecord<P> = Record<typeof ApiActionTypes[number], ActionCreator<P>>;
export type ChangedActionTypesRecord<P> = Record<typeof ChangedActionTypes[number], ActionCreator<P>>;
export type ToggledActionTypesRecord<P> = Record<typeof ToggledActionTypes[number], ActionCreator<P>>;
export type TriggerActionTypesRecord<P> = Record<typeof TriggerActionTypes[number], ActionCreator<P>>;
