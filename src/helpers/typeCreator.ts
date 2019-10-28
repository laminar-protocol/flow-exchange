import { pipe, map, fromPairs, mapObjIndexed } from 'ramda';

interface GetActionTypeResult<TActionTypeKeys extends string> {
  (prefix: string): Record<TActionTypeKeys, string>;
}

export const getActionType = <TActionTypeKeys extends string>(
  keys: readonly TActionTypeKeys[],
) => (
  prefix: string,
): Record<TActionTypeKeys, string> =>
  pipe(
    map((k: TActionTypeKeys) => [k, `${prefix}/${k}`]),
    fromPairs as () => Record<TActionTypeKeys, string>,
  )(keys);

type GetActionTypeReturnType<T> = T extends GetActionTypeResult<infer TActionTypeKeys> ? Record<TActionTypeKeys, string> : never

export const moduleActionTypes = <ModuleActionTypes extends Record<string, GetActionTypeResult<string>>>(
  modulePrefix: string, actions: ModuleActionTypes,
) => (
  parentPrefix: string,
): { [K in keyof ModuleActionTypes]: GetActionTypeReturnType<ModuleActionTypes[K]> } =>
  mapObjIndexed((val, key) => val(`${parentPrefix}/${modulePrefix}/${key}`), actions) as any;

export const appActionTypes = <AppActionTypes extends Record<string, (prefix: string) => any>>(
  appPrefix: string, types: AppActionTypes,
): { [K in keyof AppActionTypes]: ReturnType<AppActionTypes[K]> } =>
  mapObjIndexed((val) => val(appPrefix), types) as any;

const ApiActionTypes = [
  'requested',
  'completed',
  'failed',
  'cancelled',
] as const;

const ChangedActionTypes = [
  'changed',
] as const;

const ToggledActionTypes = [
  'toggled',
] as const;

const TriggerActionTypes = [
  'trigger',
] as const;

export const apiActionTypes = getActionType(ApiActionTypes);
export const changedActionTypes = getActionType(ChangedActionTypes);
export const toggledActionTypes = getActionType(ToggledActionTypes);
export const triggerActionTypes = getActionType(TriggerActionTypes);

export type ApiActionTypesRecord = Record<typeof ApiActionTypes[number], string>;
export type ChangedActionTypesRecord = Record<typeof ChangedActionTypes[number], string>;
export type ToggledActionTypesRecord = Record<typeof ToggledActionTypes[number], string>;
export type TriggerActionTypesRecord = Record<typeof TriggerActionTypes[number], string>;
