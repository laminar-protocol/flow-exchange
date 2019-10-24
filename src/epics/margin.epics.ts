import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

import types from 'types';
import { Epic } from 'reducers';

export const isEnabledEpic: Epic = (action$) => action$.pipe(
  ofType(types.margin.enabled.requested),
  map(() => ({
    type: types.tokenAuthorization.requested,
    payload: '',
  })),
);
