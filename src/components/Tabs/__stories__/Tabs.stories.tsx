import React from 'react';

import { TabPane, Tabs } from '..';

export default {
  title: 'Tabs',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _Tabs = () => (
  <Tabs>
    <TabPane> Tab1</TabPane>
    <TabPane> Tab2</TabPane>
    <TabPane> Tab3</TabPane>
    <TabPane> Tab4</TabPane>
  </Tabs>
);
