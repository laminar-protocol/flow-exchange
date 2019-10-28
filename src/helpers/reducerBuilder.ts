import { Reducer } from 'redux';
import { Action } from './typeCreator';

type StateReducer<S, P = any> = (state: S, action: Action<P>) => S

export default class ReducerBuilder<S> {
  private readonly _reducers: Record<string, StateReducer<S>> = {};
  private readonly _initalState: S;

  constructor(initalState: S) {
    this._initalState = initalState;
  }

  public handle<T>(actionCreator: () => Action<T>, handler: StateReducer<S, T>) {
    const { type } = actionCreator();
    const existing = this._reducers[type];
    if (existing) {
      this._reducers[type] = (s, act) => handler(existing(s, act), act);
    } else {
      this._reducers[type] = handler;
    }
  }

  public build(): Reducer<S> {
    return (s = this._initalState, act) => {
      const handler = this._reducers[act.type];
      if (handler) {
        return handler(s, act);
      }
      return s;
    };
  }
}
