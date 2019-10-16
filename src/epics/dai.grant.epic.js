import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.daiGrant.requested),
  mergeMap(async (action) => {
    try {
      const { value: { ethereum: { account, flowContract } } } = state$;
      const amount = action.payload;
      const success = await ethereum.daiContract.methods.approve(flowContract, amount).send({ from: account });

      return { type: types.daiGrant.completed, payload: success };
    } catch {
      return { type: types.daiGrant.failed };
    }
  }),
);

export default epic;
