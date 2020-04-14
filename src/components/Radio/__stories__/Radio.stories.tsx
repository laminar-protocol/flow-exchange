import React from 'react';

import { RadioGroup, RadioButton } from '..';

export default {
  title: 'Radio',
  decorators: [(storyFn: any) => <div style={{ padding: 160, background: '#fff' }}>{storyFn()}</div>],
};

export const _Radio = () => (
  <RadioGroup>
    <RadioButton>Tab1</RadioButton>
    <RadioButton checked={false}>Tab2</RadioButton>
  </RadioGroup>
);
