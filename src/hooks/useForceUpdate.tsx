import { useReducer } from 'react';

const useForceUpdate = () => {
  const [tick, forceUpdate] = useReducer(x => x + 1, 0);
  return [tick as number, forceUpdate as () => void] as const;
};

export default useForceUpdate;
