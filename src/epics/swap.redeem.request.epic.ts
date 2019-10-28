import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';
import { toWei } from 'helpers/unitHelper';

const epic: Epic = (action$, state$) => action$.pipe(
  ofType(types.swap.redeem.requested),
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
          swap: { fromAmount, fromSymbol },
        },
      } = state$;

      const from = ethereum.getTokenContract(fromSymbol);
      const fromAmountWei = toWei(fromAmount);

      const method = ethereum.flowContract.methods.redeem(from.options.address, pool, fromAmountWei);
      const success = await method.send({ from: account });

      return { type: types.swap.redeem.completed, payload: success };
    } catch (error) {
      console.error(error);
      return { type: types.swap.redeem.failed };
    }
  }),
);

export default epic;
