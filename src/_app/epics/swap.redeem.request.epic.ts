import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

import { addresses } from '../config';
import { accountSelector, apiSelector } from '../selectors/provider.selector';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.swap.redeem.requested),
    mergeMap(async () => {
      try {
        const {
          value: {
            swap: { fromAmount, fromSymbol },
          },
        } = state$;

        const api = apiSelector(state$.value);
        const account = accountSelector(state$.value);
        const success = await api.redeem(account, addresses.pool, fromSymbol, fromAmount);

        return { type: types.swap.redeem.completed, payload: success };
      } catch (error) {
        return { type: types.swap.redeem.failed, error };
      }
    }),
  );

export default epic;
