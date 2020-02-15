import React from 'react';

import { Button, LightButton, PrimaryButton, SolidButton } from '../';

export default {
  title: 'Home',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _Button = () => <Button>Button</Button>;
export const _LightButton = () => <LightButton>LightButton</LightButton>;
export const _PrimaryButton = () => <PrimaryButton>PrimaryButton</PrimaryButton>;
export const _SolidButton = () => <SolidButton>SolidButton</SolidButton>;
