import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import MarginHeader from './MarginHeader';
import MarginPositions from './MarginPositions';
import { Panel, Table, Row, Col, Text, Description } from '../../components';
import { IdentityIcon } from '../../icons';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const columns: any[] = [
    {
      title: t('SYMBOL'),
      dataIndex: 'symbol',
    },
    {
      title: t('BID'),
      dataIndex: 'bid',
    },
    {
      title: t('ASK'),
      dataIndex: 'ask',
    },
    {
      title: t('ENP'),
      dataIndex: 'enp',
    },
    {
      title: t('ELL'),
      dataIndex: 'ell',
    },
    {
      title: t('POOL'),
      dataIndex: 'pool',
      align: 'right',
    },
  ];

  return (
    <div>
      <MarginHeader />
      <Row align="middle" justify="space-between" className={classes.poolList}>
        <Col>
          <Row>
            <Col>
              <Panel className={clsx(classes.card, classes.all)}>
                <div>
                  <Text className={classes.text}>{t('All Pools')}</Text>
                </div>
              </Panel>
            </Col>
            <Col>
              <Panel className={classes.card}>
                <Row style={{ height: '100%' }}>
                  <div className={classes.poolIcon}>
                    <IdentityIcon size={32} value={'5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'} />
                  </div>
                  <Description
                    label={
                      <div>
                        <Text size="n">Laminar</Text>
                        <Text size="s" style={{ paddingLeft: '0.25rem' }}>
                          AVAILABLE
                        </Text>
                      </div>
                    }
                    className={classes.pool}
                  >
                    188
                  </Description>
                </Row>
              </Panel>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row style={{ marginRight: '2rem' }}>
            <Description label={t('Margin Call ENP')} align="flex-end">
              55%
            </Description>
            <div className={classes.separateWrap}>
              <div className={classes.separateItem1}></div>
              <div className={classes.separateItem2}></div>
            </div>
            <Description label={t('ELL')}>20%</Description>
            <div className={classes.separate} />
            <Description label={t('Force Closure ENP')} align="flex-end">
              20%
            </Description>
            <div className={classes.separateWrap}>
              <div className={classes.separateItem1}></div>
              <div className={classes.separateItem2}></div>
            </div>
            <Description label={t('ELL')}>1%</Description>
          </Row>
        </Col>
      </Row>
      <Panel className={classes.tableWrap}>
        <Table
          columns={columns}
          dataSource={[
            {
              symbol: 'USDUSD',
              bid: 'xxx',
              ask: 'xxx',
              enp: 'xxx',
              ell: 'xxx',
              pool: 'Laminar',
            },
          ]}
        />
      </Panel>
      <MarginPositions />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  poolList: {
    'margin-top': '1.5rem',
    'margin-bottom': '1.5rem',
  },
  tableWrap: {
    marginBottom: '1.5rem',
    padding: '1rem 0',
  },
  all: {},
  text: {},
  pool: {
    flex: 1,
    'margin-left': '1rem',
    height: '100%',
  },
  poolIcon: {
    height: '100%',
    display: 'flex',
    'align-items': 'center',
    padding: '0.5rem',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  separate: {
    width: 1,
    height: '2.5rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    borderLeft: `solid 1px ${theme.keyColorGrey}`,
  },
  separateWrap: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    marginTop: '0.20rem',
    marginBottom: '0.24rem',
  },
  separateItem1: {
    height: '0.6rem',
    borderLeft: `solid 1px ${theme.textColor.greyColor4}`,
  },
  separateItem2: {
    height: '0.75rem',
    borderLeft: `solid 1px ${theme.textColor.greyColor1}`,
  },
  card: {
    width: '13.125rem',
    marginRight: '1rem',
    height: '4rem',
    background: theme.lightBackgroundColor,
    cursor: 'pointer',
    '&:hover': {
      'box-shadow': '0 1px 20px 0 rgba(23, 65, 212, 0.18)',
      '& $text': {
        color: '#0155ff',
      },
      extend: theme.linearGradientRadiusBorder,
    },
    '&$all': {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      '& $text': {
        fontSize: '1.25rem',
      },
    },
  },
}));

export default MarginPools;
