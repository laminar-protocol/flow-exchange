import { filter, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.ethereumNetwork.requested),
  filter(() => state$.value.ethereum.isConnected === true),
  mergeMap(async () => {
    try {
      const networkType = await ethereum.ethProvider.eth.net.getNetworkType();
      ethereum.prepareContract(networkType);
      return { type: types.ethereumNetwork.completed, payload: networkType };
    } catch {
      return { type: types.ethereumNetwork.failed };
    }
  }),
);

export default epic;
