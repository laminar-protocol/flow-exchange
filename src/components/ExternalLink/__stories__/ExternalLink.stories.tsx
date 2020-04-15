import React from 'react';

import ExternalLink from '../ExternalLink';

export default {
  title: 'ExternalLink',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _ExternalLink = () => <ExternalLink value="0x123123131" />;
