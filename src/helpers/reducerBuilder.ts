import { mergeDeepRight } from 'ramda';
import { Reducer } from 'redux';
import { Action, ActionCreator } from './typeCreator';

type StateReducer<S, P = any> = (state: S, action: Action<P>) => Partial<S>;

export default class ReducerBuilder<S extends object> {
  private readonly _reducers: Record<string, StateReducer<S>> = {};
  private readonly _initalState: S;

  constructor(initalState: S) {
    this._initalState = initalState;
  }

  public handle<T>(actionCreator: ActionCreator<T> | ActionCreator<T>[], handler: StateReducer<S, T>) {
    const actionCreators = Array.isArray(actionCreator) ? actionCreator : [actionCreator];
    for (const creator of actionCreators) {
      const { type } = creator();
      const existing = this._reducers[type];
      if (existing) {
        this._reducers[type] = (s, act) => handler({ ...s, ...existing(s, act) }, act);
      } else {
        this._reducers[type] = handler;
      }
    }
    return this;
  }

  public build(): Reducer<S, Action<any>> {
    return (s = this._initalState, act) => {
      const handler = this._reducers[act.type];
      if (handler) {
        return mergeDeepRight(s, handler(s, act)) as S;
      }
      return s;
    };
  }
}

export const createReducer = <S extends object, T>(
  actionCreator: ActionCreator<T> | ActionCreator<T>[],
  initalState: S,
  handler: StateReducer<S, T>,
) => new ReducerBuilder(initalState).handle(actionCreator, handler).build();
