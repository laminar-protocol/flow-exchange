import { networkById } from 'config';
import { ofType } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import ethereum from 'services/ethereum';
import types from 'types';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.ethereum.network.requested),
    filter(() => state$.value.ethereum.isEnabled),
    mergeMap(async () => {
      try {
        const networkId = await ethereum.web3.eth.net.getId();
        return {
          type: types.ethereum.network.completed,
          payload: { network: networkById(Number(networkId)) },
        };
      } catch (error) {
        return { type: types.ethereum.network.failed, error };
      }
    }),
  );

export default epic;
