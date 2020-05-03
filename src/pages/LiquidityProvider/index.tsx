import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import LiquidityMargin from './LiquidityMargin';
import LiquiditySwap from './LiquiditySwap';
import RenderPoolsCollapse from './RenderPoolsCollapse';
import { RadioGroup, RadioButton, Text, Title, Space } from '../../components';

const LiquidityProvider = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [liquidityType, setLiquidityType] = useState<'margin' | 'swap'>('margin');

  return (
    <div>
      <Title type="page">{t('Liquidity Provider')}</Title>
      <RadioGroup
        size="middle"
        className={classes.switchLiquidity}
        value={liquidityType}
        onChange={e => setLiquidityType(e.target.value)}
      >
        <RadioButton value="margin">
          <Text>{t('Margin')}</Text>
        </RadioButton>
        <RadioButton value="swap">
          <Text>{t('Swap')}</Text>
        </RadioButton>
      </RadioGroup>
      <RenderPoolsCollapse />
      <Switch>
        <Route exact path="/provider/margin">
          <LiquidityMargin />
        </Route>
        <Route exact path="/provider/swap">
          <LiquiditySwap />
        </Route>
      </Switch>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  switchLiquidity: {
    margin: '1.5rem 0',
    width: '15rem',
  },
}));

export default LiquidityProvider;
