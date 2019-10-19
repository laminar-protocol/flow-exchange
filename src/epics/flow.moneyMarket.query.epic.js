import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.flowMoneyMarket.requested),
  mergeMap(async () => {
    try {
      const moneyMarket = await ethereum.flowContract.methods.moneyMarket().call();
      if (moneyMarket !== null) {
        ethereum.prepareMoneyMarketContract(moneyMarket);
        return { type: types.flowMoneyMarket.completed, payload: moneyMarket };
      }
      return { type: types.flowMoneyMarket.failed };
    } catch {
      return { type: types.flowMoneyMarket.failed };
    }
  }),
);

export default epic;
