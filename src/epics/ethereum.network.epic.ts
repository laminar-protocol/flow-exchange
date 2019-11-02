import { filter, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import ethereum from 'services/ethereum';
import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$, state$) => action$.pipe(
  ofType(types.ethereum.network.requested),
  filter(() => state$.value.ethereum.isEnabled),
  mergeMap(async () => {
    try {
      const network = await ethereum.web3.eth.net.getNetworkType();
      return {
        type: types.ethereum.network.completed,
        payload: { network },
      };
    } catch (error) {
      console.error(error);
      return { type: types.ethereum.network.failed };
    }
  }),
);

export default epic;
