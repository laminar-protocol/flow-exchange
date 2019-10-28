import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.swap.fromSymbol.changed, types.swap.toSymbol.changed),
  mergeMap((action) => of({ type: types.spot.rate.requested, payload: action.payload })),
);

export default epic;
