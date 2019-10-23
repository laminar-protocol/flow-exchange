import { filter, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import ethereum from 'services/ethereum';
import types from 'types';
import { deployment } from 'config';

const epic = (action$, state$) => action$.pipe(
  ofType(types.ethereumNetwork.requested),
  filter(() => state$.value.ethereum.isEnabled),
  mergeMap(async () => {
    try {
      const network = await ethereum.ethProvider.eth.net.getNetworkType();
      const contractAddresses = deployment[network];
      if (contractAddresses !== null) {
        ethereum.prepareBaseContract(contractAddresses);
        ethereum.prepareTokenContract(contractAddresses);
        return {
          type: types.ethereumNetwork.completed,
          payload: { network, addresses: contractAddresses },
        };
      }
      return { type: types.ethereumNetwork.failed };
    } catch (error) {
      console.error(error);
      return { type: types.ethereumNetwork.failed };
    }
  }),
);

export default epic;
