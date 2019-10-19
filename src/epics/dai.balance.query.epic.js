import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.daiBalance.requested),
  mergeMap(async () => {
    try {
      const {
        value: {
          ethereum: { account },
        },
      } = state$;
      const balance = await ethereum.daiContract.methods.balanceOf(account).call();
      return { type: types.daiBalance.completed, payload: balance };
    } catch {
      return { type: types.daiBalance.failed };
    }
  }),
);

export default epic;
