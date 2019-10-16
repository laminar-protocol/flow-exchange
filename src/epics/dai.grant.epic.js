import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.daiGrant.requested),
  mergeMap(async () => {
    try {
      const { value: { ethereum: { account } } } = state$;
      const { addresses: { flow } } = ethereum;
      const UINT_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

      const success = await ethereum.daiContract.methods.approve(flow, UINT_MAX).send({ from: account });

      return { type: types.daiGrant.completed, payload: success };
    } catch {
      return { type: types.daiGrant.failed };
    }
  }),
);

export default epic;
