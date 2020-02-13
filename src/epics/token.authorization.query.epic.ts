import { ofType } from 'redux-observable';
import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import types from 'types';

import { accountSelector, apiSelector } from '../selectors/provider.selector';

const epic: Epic = (action$, state$) =>
  combineLatest(
    action$.pipe(ofType(types.provider.network.completed), take(1)),
    action$.pipe(ofType(types.token.authorization.requested)),
  ).pipe(
    mergeMap(async ([, action]) => {
      const {
        payload: { symbol, address },
      } = action;

      try {
        const api = apiSelector(state$.value);
        const account = accountSelector(state$.value);

        const result = await api.getAuthorization(account, symbol, address);

        return {
          type: types.token.authorization.completed,
          payload: result,
        };
      } catch (error) {
        return { type: types.token.authorization.failed, payload: { symbol }, error };
      }
    }),
  );

export default epic;
