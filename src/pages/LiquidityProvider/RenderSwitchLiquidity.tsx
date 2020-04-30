import React, { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { RadioGroup, RadioButton, Text } from '../../components';

type RenderSwitchLiquidityProps = {
  value: 'margin' | 'swap';
};

const RenderSwitchLiquidity: React.FC<RenderSwitchLiquidityProps> = ({ value }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <RadioGroup value={value} onChange={e => {}}>
      <RadioButton value="basic">
        <Text>Basic</Text>
      </RadioButton>
      <RadioButton value="advanced" disabled>
        <Text>Advanced</Text>
      </RadioButton>
    </RadioGroup>
  );
};

const useStyles = createUseStyles(theme => ({}));

export default RenderSwitchLiquidity;
