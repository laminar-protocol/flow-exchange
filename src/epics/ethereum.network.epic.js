import { filter, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import ethereum from 'services/ethereum';
import types from 'types';
import { contracts, symbols } from 'config';

const epic = (action$, state$) => action$.pipe(
  ofType(types.ethereumNetwork.requested),
  filter(() => state$.value.ethereum.isEnabled === true),
  mergeMap(async () => {
    try {
      const network = await ethereum.ethProvider.eth.net.getNetworkType();
      const contractAddresses = contracts[network];
      const symbolAddresses = symbols[network];
      if (contractAddresses !== null && symbolAddresses != null) {
        ethereum.prepareBaseContract(contractAddresses);
        ethereum.prepareTokenContract(symbolAddresses);
        return {
          type: types.ethereumNetwork.completed,
          payload: { network, addresses: contractAddresses },
        };
      }
      return { type: types.ethereumNetwork.failed };
    } catch {
      return { type: types.ethereumNetwork.failed };
    }
  }),
);

export default epic;
