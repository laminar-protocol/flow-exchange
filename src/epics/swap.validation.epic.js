import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.swapFromAmount.changed, types.swapToAmount.changed),
  mergeMap(() => of(
    { type: types.swapValidation.changed },
  )),
);

export default epic;
