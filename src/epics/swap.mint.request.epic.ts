import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

import { addresses } from '../config';
import { accountSelector, apiSelector } from '../selectors/provider.selector';

const mint: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.swap.mint.requested),
    mergeMap(async () => {
      try {
        const {
          value: {
            swap: { fromAmount, toSymbol },
          },
        } = state$;

        const api = apiSelector(state$.value);
        const account = accountSelector(state$.value);
        const success = await api.mint(account, addresses.pool, toSymbol, fromAmount);

        return { type: types.swap.mint.completed, payload: success };
      } catch (error) {
        return { type: types.swap.mint.failed, error };
      }
    }),
  );

export default mint;
