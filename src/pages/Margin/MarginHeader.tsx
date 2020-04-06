import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import { Panel, Title, Row, Text, Switch, Description } from '../../components';

const MarginHeader = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Panel padding="0.75rem 2rem">
      <Row justify="space-between">
        <Title type="panel" className={classes.title}>
          {t('Margin Trading')}
        </Title>
        <Row>
          <Description label={t('TOTAL BALANCE')} align="flex-end">
            111100.000 LAMI
          </Description>
          <div className={classes.separate} />
          <Description label={t('ENABLE TRADING')} align="flex-end">
            <Switch className={classes.switch} checked={true} onClick={() => {}} />
          </Description>
        </Row>
      </Row>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  title: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  separate: {
    width: 1,
    height: '2.75rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    borderLeft: `solid 1px ${theme.keyColorGrey}`,
  },
  switch: {
    marginTop: '0.125rem',
  },
}));

export default MarginHeader;
