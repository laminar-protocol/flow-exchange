import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.daiAuthorization.requested),
  mergeMap(async () => {
    try {
      const {
        value: {
          ethereum: { account, contracts: { flow } },
        },
      } = state$;
      const amount = await ethereum.daiContract.methods.allowance(account, flow).call();
      return { type: types.daiAuthorization.completed, payload: amount };
    } catch {
      return { type: types.daiAuthorization.failed };
    }
  }),
);

export default epic;
