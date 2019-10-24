import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$, state$) => combineLatest(
  action$.pipe(ofType(types.ethereumNetwork.completed), take(1)),
  action$.pipe(ofType(types.tokenAuthorization.requested)),
).pipe(
  mergeMap(async ([, action]) => {
    const { payload: { symbol, address } } = action;

    try {
      const {
        value: {
          ethereum: { account, contracts: { flow } },
        },
      } = state$;

      const grantAddress = address || flow;
      const contract = ethereum.getTokenContract(symbol);
      const balance = await contract.methods.allowance(account, grantAddress).call();
      return {
        type: types.tokenAuthorization.completed,
        payload: { symbol, balance },
      };
    } catch (error) {
      console.error(error);
      return { type: types.tokenAuthorization.failed, payload: { symbol } };
    }
  }),
);

export default epic;
