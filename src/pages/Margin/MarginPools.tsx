import React from 'react';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Panel, Title, Row, Text, Switch } from '../../components';

const MarginPools = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <Row>
        <Panel className={clsx(classes.card, classes.all)}>
          <div>
            <Text className={classes.text}>All Pools</Text>
          </div>
        </Panel>
        <Panel className={classes.card}>
          <div className={classes.pool}>
            <div className={classes.poolName}>
              <Text>Laminar</Text>
              <Text>AVAILABLE</Text>
            </div>
            <div className={classes.available}>188</div>
          </div>
        </Panel>
        <Panel className={classes.card}>All Pools</Panel>
      </Row>
    </div>
    // <Panel>
    //   <Row align="middle" justify="space-between">
    //     <Title type="panel" className={classes.title}>
    //       {t('Margin Trading')}
    //     </Title>
    //     <Row>
    //       <div className={classes.item}>
    //         <div className={classes.label}>
    //           <Text size="s" className={classes.label} light>
    //             {t('TOTAL BALANCE')}
    //           </Text>
    //         </div>
    //         <div className={classes.content}>
    //           <Text>111100.000 LAMI</Text>
    //         </div>
    //       </div>
    //       <div className={classes.separate}></div>
    //       <div className={classes.item}>
    //         <div className={classes.label}>
    //           <Text size="s" light>
    //             {t('ENABLE TRADING')}
    //           </Text>
    //         </div>
    //         <div className={classes.content}>
    //           <Switch className={classes.switch} checked={true} onClick={() => {}} />
    //         </div>
    //       </div>
    //     </Row>
    //   </Row>
    // </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  container: {
    marginTop: '1.5rem',
  },
  all: {},
  text: {},
  pool: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    height: '100%',
    'justify-content': 'center',
  },
  available: {},
  poolName: {},
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
  // gradientInner
  // title: {
  //   paddingTop: '0.5rem',
  //   paddingBottom: '0.5rem',
  // },
  // label: {},
  // content: {},
  // separate: {
  //   width: 1,
  //   height: '2.25rem',
  //   marginLeft: '1.5rem',
  //   marginRight: '1.5rem',
  //   borderLeft: `solid 1px ${theme.keyColorGrey}`,
  // },
  // switch: {
  //   marginTop: '0.125rem',
  // },
}));

export default MarginPools;
