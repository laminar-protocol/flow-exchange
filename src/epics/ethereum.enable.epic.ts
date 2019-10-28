import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.ethereum.enable.requested),
  mergeMap(async () => {
    try {
      const accounts = await ethereum.ethWeb3.enable();
      return { type: types.ethereum.enable.completed, payload: accounts[0] };
    } catch (error) {
      console.error(error);
      return { type: types.ethereum.enable.failed };
    }
  }),
);

export default epic;
