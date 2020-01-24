import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import types from 'types';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.ethereum.enable.completed),
    mergeMap(() => of({ type: types.ethereum.modalClose.changed })),
  );

export default epic;
