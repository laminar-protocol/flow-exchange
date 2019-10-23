import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$) => combineLatest(
  action$.pipe(ofType(types.ethereumNetwork.completed), take(1)),
  action$.pipe(ofType(types.flowOracle.requested)),
).pipe(
  mergeMap(async () => {
    try {
      const oracle = await ethereum.flowContract.methods.oracle().call();
      if (oracle !== null) {
        ethereum.prepareOracleContract(oracle);
        return { type: types.flowOracle.completed, payload: oracle };
      }
      return { type: types.flowOracle.failed };
    } catch (error) {
      console.error(error);
      return { type: types.flowOracle.failed };
    }
  }),
);

export default epic;
