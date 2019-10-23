import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.tokenGrant.requested),
  mergeMap(async (action) => {
    const { payload: { symbol, balance } } = action;
    try {
      const {
        value: {
          ethereum: { account, contracts: { flow } },
        },
      } = state$;
      const contract = ethereum.getTokenContract(symbol);
      await contract.methods.approve(flow, balance).send({ from: account });

      return { type: types.tokenGrant.completed, payload: { symbol } };
    } catch (error) {
      console.error(error);
      return { type: types.tokenGrant.failed, payload: { symbol } };
    }
  }),
);

export default epic;
