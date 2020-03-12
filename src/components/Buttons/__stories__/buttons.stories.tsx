import React from 'react';

import { DefaultButton, LightButton, PrimaryButton, SolidButton } from '..';

export default {
  title: 'Buttons',
  decorators: [(storyFn: any) => <div style={{ padding: 160 }}>{storyFn()}</div>],
};

export const _DefaultButton = () => <DefaultButton>Button</DefaultButton>;
export const _LightButton = () => <LightButton>LightButton</LightButton>;
export const _PrimaryButton = () => <PrimaryButton>PrimaryButton</PrimaryButton>;
export const _SolidButton = () => <SolidButton>SolidButton</SolidButton>;
