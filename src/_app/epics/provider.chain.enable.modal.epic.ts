import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.provider.enable.completed),
    mergeMap(() => of({ type: types.provider.modalClose.changed })),
  );

export default epic;
