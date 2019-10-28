import { filter, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import ethereum from 'services/ethereum';
import types from 'types';
import { deployment } from 'config';
import { Epic } from 'reducers';

const epic: Epic = (action$, state$) => action$.pipe(
  ofType(types.ethereum.network.requested),
  filter(() => state$.value.ethereum.isEnabled),
  mergeMap(async () => {
    try {
      const network = await ethereum.ethProvider.eth.net.getNetworkType();
      const contractAddresses = (deployment as any)[network];
      if (contractAddresses !== null) {
        ethereum.prepareBaseContract(contractAddresses);
        return {
          type: types.ethereum.network.completed,
          payload: { network, addresses: contractAddresses },
        };
      }
      return { type: types.ethereum.network.failed };
    } catch (error) {
      console.error(error);
      return { type: types.ethereum.network.failed };
    }
  }),
);

export default epic;
