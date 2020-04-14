import React from 'react';

import { Select, SelectOption } from '..';

export default {
  title: 'Selects',
  decorators: [(storyFn: any) => <div style={{ padding: 160, background: '#fff' }}>{storyFn()}</div>],
};

export const _Select = () => (
  <Select>
    <SelectOption value="tab1">Tab1</SelectOption>
    <SelectOption value="tab2">Tab2</SelectOption>
    <SelectOption value="tab3">Tab3</SelectOption>
    <SelectOption value="tab4">Tab4</SelectOption>
    <SelectOption value="tab5">Tab5</SelectOption>
  </Select>
);
