import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.flowOracle.requested),
  mergeMap(async () => {
    try {
      const oracle = await ethereum.flowContract.methods.oracle().call();
      if (oracle !== null) {
        ethereum.prepareOracleContract(oracle);
        return { type: types.flowOracle.completed, payload: oracle };
      }
      return { type: types.flowOracle.failed };
    } catch {
      return { type: types.flowOracle.failed };
    }
  }),
);

export default epic;
