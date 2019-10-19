import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.swapFromSymbol.changed, types.swapToSymbol.changed),
  mergeMap((action) => of({ type: types.spotRate.requested, payload: action.payload })),
);

export default epic;
