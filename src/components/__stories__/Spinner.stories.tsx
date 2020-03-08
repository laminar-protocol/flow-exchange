import React from 'react';

import { Spinner } from '../Spinner';

export default {
  title: 'Spinner',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _Spinner = () => <Spinner />;
