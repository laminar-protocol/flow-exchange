import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

import { accountSelector, apiSelector } from '../selectors/provider.selector';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.faucet.dai.requested),
    mergeMap(async action => {
      const {
        payload: { symbol, amount },
      } = action;

      try {
        const api = apiSelector(state$.value);
        const account = accountSelector(state$.value);

        await api.daiFaucet(account, symbol, amount);

        return { type: types.faucet.dai.completed, payload: { amount } };
      } catch (error) {
        return { type: types.faucet.dai.failed, payload: null, error };
      }
    }),
  );

export default epic;
