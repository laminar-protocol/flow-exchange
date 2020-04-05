import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import { Panel, Title, Row, Text, Switch } from '../../components';

const MarginHeader = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Panel>
      <Row align="middle" justify="space-between">
        <Title type="panel" className={classes.title}>
          {t('Margin Trading')}
        </Title>
        <Row>
          <div className={classes.item}>
            <div className={classes.label}>
              <Text size="s" className={classes.label} light>
                {t('TOTAL BALANCE')}
              </Text>
            </div>
            <div className={classes.content}>
              <Text>111100.000 LAMI</Text>
            </div>
          </div>
          <div className={classes.separate}></div>
          <div className={classes.item}>
            <div className={classes.label}>
              <Text size="s" light>
                {t('ENABLE TRADING')}
              </Text>
            </div>
            <div className={classes.content}>
              <Switch className={classes.switch} checked={true} onClick={() => {}} />
            </div>
          </div>
        </Row>
      </Row>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  label: {},
  content: {},
  separate: {
    width: 1,
    height: '2.25rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    borderLeft: `solid 1px ${theme.keyColorGrey}`,
  },
  switch: {
    marginTop: '0.125rem',
  },
}));

export default MarginHeader;
