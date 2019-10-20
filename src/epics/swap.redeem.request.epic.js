import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { toWei } from 'helpers/unitHelper';

const epic = (action$, state$) => action$.pipe(
  ofType(types.swapRedeem.requested),
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
          swap: { fromAmount, fromSymbol },
        },
      } = state$;

      const to = symbols[fromSymbol];
      const fromAmountWei = toWei(fromAmount);

      const method = ethereum.flowContract.methods.redeem(to.contract, pool, fromAmountWei);
      const success = await method.send({ from: account });

      return { type: types.swapRedeem.completed, payload: success };
    } catch {
      return { type: types.swapRedeem.failed };
    }
  }),
);

export default epic;
