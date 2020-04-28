import { useReducer } from 'react';

const useForceUpdate = () => {
  const [tick, forceUpdate] = useReducer(x => x + 1, 0);
  return [tick, forceUpdate];
};

export default useForceUpdate;
