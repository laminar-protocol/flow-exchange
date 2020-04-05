import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import { Panel, Title } from '../../components';

const Margin = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Panel>
      <Title type="panel">{t('Margin Trading')}</Title>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({}));

export default Margin;
