import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';
import { toWei } from 'helpers/unitHelper';
import { addresses } from 'config';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.swap.mint.requested),
    mergeMap(async () => {
      try {
        const {
          value: {
            ethereum: { account },
            swap: { fromAmount, toSymbol },
          },
        } = state$;

        const to = ethereum.getTokenContract(toSymbol);
        const fromAmountWei = toWei(fromAmount);

        const method = ethereum.flowProtocol.methods.mint(to.options.address, addresses.pool, fromAmountWei);
        const success = await method.send({ from: account });

        return { type: types.swap.mint.completed, payload: success };
      } catch (error) {
        return { type: types.swap.mint.failed, error };
      }
    }),
  );

export default epic;
