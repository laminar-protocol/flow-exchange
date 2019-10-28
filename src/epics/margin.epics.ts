import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';

export const isEnabledEpic: Epic = (action$) => action$.pipe(
  ofType(types.margin.enabled.requested),
  mergeMap(async () => {
    await ethereum.ready;
    return {
      type: types.token.authorization.requested,
      payload: {
        address: ethereum.flowMarginProtocol.options.address,
        symbol: 'DAI',
      },
    };
  }),
);
