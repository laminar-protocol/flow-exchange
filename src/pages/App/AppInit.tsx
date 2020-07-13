import React, { useLayoutEffect } from 'react';

import useApp from '../../store/useApp';

const AppInit: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const setState = useApp(state => state.setState);

  useLayoutEffect(() => {
    if (currentApi?.currencies?.tokens) {
      const s = currentApi.currencies.tokens().subscribe(data => {
        setState(state => {
          state.tokens = data;
        });
      });

      return () => s && s.unsubscribe();
    }
  }, [currentApi, setState]);

  return null;
};

export default React.memo(AppInit);
