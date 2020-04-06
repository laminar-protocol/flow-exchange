import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import MarginHeader from './MarginHeader';
import MarginPositions from './MarginPositions';
import ChartWidget from './ChartWidget';
import { Panel, Table, Row, Col, Text, Description } from '../../components';
import { IdentityIcon } from '../../icons';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <MarginHeader />
      <Row>
        <Col span={14}>
          <Panel title={t('Price Chart')} className={classes.chart}>
            <ChartWidget symbol="BTC" className={classes.chartWidget} />
          </Panel>
        </Col>
        <Col span={10}></Col>
      </Row>
      <MarginPositions />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  chart: { 'margin-bottom': '1.5rem', 'margin-top': '1.5rem', width: '100%' },
  chartWidget: { height: '37.5rem' },
}));

export default MarginPools;
