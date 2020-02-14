import { ofType } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import types from 'types';

import { apiSelector } from '../selectors/provider.selector';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.provider.network.requested),
    filter(() => state$.value.provider.isEnabled),
    mergeMap(async () => {
      const api = apiSelector(state$.value);

      try {
        const network = await api.getNetworkType();
        return {
          type: types.provider.network.completed,
          payload: { network },
        };
      } catch (error) {
        return { type: types.provider.network.failed, error };
      }
    }),
  );

export default epic;
