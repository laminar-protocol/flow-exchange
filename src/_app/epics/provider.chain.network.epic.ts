import { tokens } from '_app/config';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.provider.network.completed),
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
