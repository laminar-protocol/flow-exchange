import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.swap.fromAmount.changed, types.swap.toAmount.changed),
    mergeMap(() => of({ type: types.swap.validation.changed })),
  );

export default epic;
