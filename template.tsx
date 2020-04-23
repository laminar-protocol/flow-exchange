import React, { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

type ComponentProps = {};

const Component: React.FC<ComponentProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return null;
};

const useStyles = createUseStyles(theme => ({}));

export default Component;
