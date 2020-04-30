import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import LiquidityMargin from './LiquidityMargin';
import LiquiditySwap from './LiquiditySwap';
import { RadioGroup, RadioButton, Text } from '../../components';

const LiquidityProvider = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <RadioGroup value={'margin'} onChange={e => {}}>
        <RadioButton value="margin">
          <Text>{t('Margin')}</Text>
        </RadioButton>
        <RadioButton value="swap">
          <Text>{t('Swap')}</Text>
        </RadioButton>
      </RadioGroup>
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

const useStyles = createUseStyles(theme => ({}));

export default LiquidityProvider;
