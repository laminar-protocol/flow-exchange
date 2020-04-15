import { useLayoutEffect } from 'react';
import { Observable } from 'rxjs';

const useApiSubscription = <T>(subscription: Observable<T>, deps = []) => {
  let loading = false;
  useLayoutEffect(() => {
    subscription.subscribe();
  }, deps);
  return;
};
