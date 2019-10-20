import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { toWei } from 'helpers/unitHelper';

const epic = (action$, state$) => action$.pipe(
  ofType(types.swap.requested),
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
          market: { symbols },
          swap: { fromAmount, toSymbol },
        },
      } = state$;

      const to = symbols[toSymbol];
      const fromAmountWei = toWei(fromAmount);

      const method = ethereum.flowContract.methods.mint(to.contract, pool, fromAmountWei);
      const success = await method.send({ from: account });

      return { type: types.swap.completed, payload: success };
    } catch {
      return { type: types.swap.failed };
    }
  }),
);

export default epic;
