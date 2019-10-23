import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => combineLatest(
  action$.pipe(ofType(types.ethereumNetwork.completed), take(1)),
  action$.pipe(ofType(types.tokenBalance.requested)),
).pipe(
  mergeMap(async ([, action]) => {
    const { payload: { symbol } } = action;
    try {
      const {
        value: {
          ethereum: { account },
        },
      } = state$;

      const contract = ethereum.getTokenContract(symbol);
      const balance = await contract.methods.balanceOf(account).call();
      return {
        type: types.tokenBalance.completed,
        payload: { symbol, balance },
      };
    } catch (error) {
      console.error(error);
      return { type: types.tokenBalance.failed, payload: { symbol, error } };
    }
  }),
);

export default epic;
