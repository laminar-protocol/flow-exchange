import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import types from 'types';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.app.init.trigger),
    mergeMap(() => of({ type: types.provider.enable.requested })),
  );

export default epic;
