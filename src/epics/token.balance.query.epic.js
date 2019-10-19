import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.tokenBalance.requested),
  mergeMap(async (action) => {
    const { payload: { symbol } } = action;
    try {
      const {
        value: {
          ethereum: { account },
        },
      } = state$;

      const contract = ethereum.tokenContracts[symbol];
      const balance = await contract.methods.balanceOf(account).call();
      return {
        type: types.tokenBalance.completed,
        payload: { symbol, balance },
      };
    } catch {
      return { type: types.tokenBalance.failed, payload: { symbol } };
    }
  }),
);

export default epic;
