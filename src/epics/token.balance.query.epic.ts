import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$, state$) =>
  combineLatest(
    action$.pipe(ofType(types.ethereum.network.completed), take(1)),
    action$.pipe(ofType(types.token.balance.requested))
  ).pipe(
    mergeMap(async ([, action]) => {
      const {
        payload: { symbol },
      } = action;
      try {
        const {
          value: {
            ethereum: { account },
          },
        } = state$;

        const contract = ethereum.getTokenContract(symbol);
        const balance = await contract.methods.balanceOf(account).call();
        return {
          type: types.token.balance.completed,
          payload: { symbol, balance },
        };
      } catch (error) {
        return { type: types.token.balance.failed, payload: { symbol, error }, error };
      }
    })
  );

export default epic;
