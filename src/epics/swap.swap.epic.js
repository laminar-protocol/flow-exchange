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
          ethereum: { account, contracts },
          swap: { fromSymbol, fromAmount, toSymbol },
        },
      } = state$;

      const toContract = contracts[toSymbol];
      const { pool } = contracts;
      const fromAmountWei = toWei(fromAmount);

      const success = await ethereum.flowContract.methods.mint(toContract, pool, fromAmountWei).send({ from: account });

      return { type: types.swap.completed, payload: success };
    } catch {
      return { type: types.swap.failed };
    }
  }),
);

export default epic;
