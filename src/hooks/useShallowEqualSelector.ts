import { useSelector, shallowEqual } from 'react-redux';

export const useShallowEqualSelector = <T, P>(selector: (state: T) => P): P =>
  useSelector<T, P>(selector, shallowEqual);
