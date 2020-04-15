import React from 'react';

import Dialog from '../Dialog';

export default {
  title: 'Modal',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _Dialog = () => (
  <Dialog
    transitionName="none"
    maskTransitionName="none"
    title="Choose different account"
    visible={true}
    onOk={() => {}}
    onCancel={() => {}}
    footer={null}
    maskClosable={true}
    style={{ top: 200 }}
  >
    <div>
      哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈
      哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈 哈哈哈哈
    </div>
  </Dialog>
);
