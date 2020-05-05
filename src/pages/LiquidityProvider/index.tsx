import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { RadioButton, RadioGroup, Text, Title } from '../../components';
import useLiquidityProvider from './hooks/useLiquidityProvider';
import LiquidityMargin from './LiquidityMargin';
import LiquiditySwap from './LiquiditySwap';

const LiquidityProvider = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const setState = useLiquidityProvider(state => state.setState);

  const liquidityType = useLiquidityProvider(state => state.liquidityType);

  useLayoutEffect(() => {
    if (liquidityType === 'margin' && history.location.pathname !== '/provider/margin') {
      history.push('/provider/margin');
    }
    if (liquidityType === 'swap' && history.location.pathname !== '/provider/swap') {
      history.push('/provider/swap');
    }
  }, [liquidityType, history]);

  return (
    <div>
      <Title type="page">{t('Liquidity Provider')}</Title>
      <RadioGroup
        size="middle"
        className={classes.switchLiquidity}
        value={liquidityType}
        onChange={e =>
          setState(state => {
            state.liquidityType = e.target.value;
          })
        }
      >
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

const useStyles = createUseStyles(theme => ({
  switchLiquidity: {
    margin: '1.5rem 0',
    width: '15rem',
  },
}));

export default LiquidityProvider;
