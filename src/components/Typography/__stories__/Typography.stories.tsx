import React from 'react';

import Text from '../Text';

export default {
  title: 'Typography',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _TextSize = () => (
  <div>
    <div>
      n: <Text size="n">哈哈哈哈哈哈哈</Text>;
    </div>
    <div>
      l: <Text size="l">哈哈哈哈哈哈哈</Text>;
    </div>
    <div>
      s: <Text size="s">哈哈哈哈哈哈哈</Text>;
    </div>
    <div>
      t: <Text size="t">哈哈哈哈哈哈哈</Text>;
    </div>
  </div>
);
