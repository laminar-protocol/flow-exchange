import { DeepReadonly } from 'utility-types';

import types from 'types';

const INITIAL_STATE = {
  balances: {} as any,
  authorizations: {} as any,
  isQueryingBalance: {} as any,
  isQueryingAuthorization: {} as any,
  isGranting: {} as any,
};

export type State = DeepReadonly<typeof INITIAL_STATE>;

export const getAuthorization = (symbol: string, state: State) => state.authorizations[symbol];
export const getBalance = (symbol: string, state: State) => state.balances[symbol];
export const getIsQueryingBalance = (symbol: string, state: State) => state.isQueryingBalance[symbol];
export const getIsQueryingAuthorization = (symbol: string, state: State) => state.isQueryingAuthorization[symbol];
export const getIsGranting = (symbol: string, state: State) => state.isGranting[symbol];

const reducer = (state = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case types.tokenBalance.requested:
      return {
        ...state,
        isQueryingBalance: {
          ...state.isQueryingBalance,
          [payload.symbol]: true,
        },
      };
    case types.tokenBalance.failed:
      return {
        ...state,
        isQueryingBalance: {
          ...state.isQueryingBalance,
          [payload.symbol]: false,
        },
      };
    case types.tokenBalance.completed:
      return {
        ...state,
        balances: {
          ...state.balances,
          [payload.symbol]: payload.balance,
        },
        isQueryingBalance: {
          ...state.isQueryingBalance,
          [payload.symbol]: false,
        },
      };

    case types.tokenAuthorization.requested:
      return {
        ...state,
        isQueryingAuthorization: {
          ...state.isQueryingAuthorization,
          [payload.symbol]: true,
        },
      };
    case types.tokenAuthorization.failed:
      return {
        ...state,
        isQueryingAuthorization: {
          ...state.isQueryingAuthorization,
          [payload.symbol]: false,
        },
      };
    case types.tokenAuthorization.completed:
      return {
        ...state,
        authorizations: {
          ...state.authorizations,
          [payload.symbol]: payload.balance,
        },
        isQueryingAuthorization: {
          ...state.isQueryingAuthorization,
          [payload.symbol]: false,
        },
      };

    case types.tokenGrant.requested:
      return {
        ...state,
        isGranting: {
          ...state.isGranting,
          [payload.symbol]: true,
        },
      };
    case types.tokenGrant.failed:
      return {
        ...state,
        isGranting: {
          ...state.isGranting,
          [payload.symbol]: false,
        },
      };
    case types.tokenGrant.completed:
      return {
        ...state,
        isGranting: {
          ...state.isGranting,
          [payload.symbol]: false,
        },
      };

    default:
      return state;
  }
};

export default reducer;
