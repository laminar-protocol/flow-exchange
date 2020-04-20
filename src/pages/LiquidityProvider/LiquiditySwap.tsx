import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import {} from '../../components';
import { useApiSelector } from '../../selectors';

const LiquiditySwap: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApiSelector();

  return <div></div>;
};

const useStyles = createUseStyles(theme => ({
  root: {},
}));

export default LiquiditySwap;
