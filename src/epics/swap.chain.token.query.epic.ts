import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { tokens } from 'config';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.swap.mint.completed, types.swap.redeem.completed),
    mergeMap(() => {
      const values = Object.keys(tokens);

      const tokenRequests: any = values.flatMap(key => [
        { type: types.token.balance.requested, payload: { symbol: key } },
        { type: types.token.authorization.requested, payload: { symbol: key } },
      ]);

      return of(...tokenRequests);
    }),
  );

export default epic;
