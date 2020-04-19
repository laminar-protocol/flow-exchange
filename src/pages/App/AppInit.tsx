import React, { useLayoutEffect } from 'react';

import useApp from '../../store/useApp';

const AppInit: React.FC = () => {
  const currentApi = useApp(state => state.api);
  const setState = useApp(state => state.setState);

  useLayoutEffect(() => {
    if (currentApi?.tokens) {
      const s = currentApi.tokens().subscribe((data: any) => {
        setState(state => {
          state.tokens = data;
        });
      });

      return () => s && s.unsubscribe();
    }
  }, [currentApi, setState]);

  return null;
};

export default AppInit;
