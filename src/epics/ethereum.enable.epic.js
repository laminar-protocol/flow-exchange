import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.ethereumEnable.requested),
  mergeMap(async () => {
    try {
      const accounts = await ethereum.ethWeb3.enable();
      return { type: types.ethereumEnable.completed, payload: accounts[0] };
    } catch (error) {
      console.error(error);
      return { type: types.ethereumEnable.failed };
    }
  }),
);

export default epic;
