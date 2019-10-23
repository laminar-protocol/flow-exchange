import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$) => combineLatest(
  action$.pipe(ofType(types.ethereumNetwork.completed), take(1)),
  action$.pipe(ofType(types.flowMoneyMarket.requested)),
).pipe(
  mergeMap(async () => {
    try {
      const moneyMarket = await ethereum.flowContract.methods.moneyMarket().call();
      if (moneyMarket !== null) {
        ethereum.prepareMoneyMarketContract(moneyMarket);
        return { type: types.flowMoneyMarket.completed, payload: moneyMarket };
      }
      return { type: types.flowMoneyMarket.failed };
    } catch (error) {
      console.error(error);
      return { type: types.flowMoneyMarket.failed };
    }
  }),
);

export default epic;
