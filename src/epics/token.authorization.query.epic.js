import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.tokenAuthorization.requested),
  mergeMap(async (action) => {
    const { payload: { symbol } } = action;

    try {
      const {
        value: {
          ethereum: { account, contracts: { flow } },
        },
      } = state$;

      const contract = ethereum.tokenContracts[symbol];
      const balance = await contract.methods.allowance(account, flow).call();
      return {
        type: types.tokenAuthorization.completed,
        payload: { symbol, balance },
      };
    } catch {
      return { type: types.tokenAuthorization.failed, payload: { symbol } };
    }
  }),
);

export default epic;
