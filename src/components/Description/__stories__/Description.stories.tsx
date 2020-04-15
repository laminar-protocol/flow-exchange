import React from 'react';

import { Description } from '..';

export default {
  title: 'Description',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _Description = () => <Description label="Text">1231232</Description>;
