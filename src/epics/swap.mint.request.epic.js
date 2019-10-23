import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { toWei } from 'helpers/unitHelper';

const epic = (action$, state$) => action$.pipe(
  ofType(types.swapMint.requested),
  mergeMap(async () => {
    try {
      const {
        value: {
          ethereum: {
            account,
            contracts: {
              pool,
            },
          },
          swap: { fromAmount, toSymbol },
        },
      } = state$;

      const to = ethereum.getTokenContract(toSymbol);
      const fromAmountWei = toWei(fromAmount);

      const method = ethereum.flowContract.methods.mint(to.options.address, pool, fromAmountWei);
      const success = await method.send({ from: account });

      return { type: types.swapMint.completed, payload: success };
    } catch (error) {
      console.error(error);
      return { type: types.swapMint.failed };
    }
  }),
);

export default epic;
