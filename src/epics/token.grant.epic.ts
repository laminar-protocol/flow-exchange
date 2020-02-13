import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

import { accountSelector, apiSelector } from '../selectors/provider.selector';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.token.grant.requested),
    mergeMap(async action => {
      const {
        payload: { symbol, balance },
      } = action;
      try {
        const api = apiSelector(state$.value);
        const account = accountSelector(state$.value);

        await api.grant(account, symbol, balance);

        return { type: types.token.grant.completed, payload: { symbol } };
      } catch (error) {
        return { type: types.token.grant.failed, payload: { symbol }, error };
      }
    }),
  );

export default epic;
