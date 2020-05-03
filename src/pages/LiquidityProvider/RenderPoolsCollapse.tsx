import React, { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Collapse, CollapsePanel, PoolName, Text, Description } from '../../components';

type RenderPoolsCollapseProps = {};

const RenderPoolsCollapse: React.FC<RenderPoolsCollapseProps> = ({}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const poolDetail = [
    {
      label: 'Owner',
      value: 'eqhe2q',
    },
    {
      label: 'Enp',
      value: '3123123',
    },
    {
      label: 'Ell',
      value: '3123123',
    },
    {
      label: 'Margin Level',
      value: '3213123',
    },
    {
      label: 'Equity',
      value: '312312',
    },
  ];

  return (
    <Collapse className={classes.root}>
      <CollapsePanel
        header={
          <div className={classes.header}>
            <Text size="l" className={classes.poolName}>
              <PoolName type="margin" value="0" />
            </Text>
            <div className={classes.poolDetail}>
              {poolDetail.map(({ label, value }) => (
                <Description label={label} layout="vertical">
                  {value}
                </Description>
              ))}
            </div>
          </div>
        }
        key="1"
      >
        和和23123和12
      </CollapsePanel>
      <CollapsePanel header={<div className={classes.header}>uuuuu</div>} key="2">
        和和23123和
      </CollapsePanel>
    </Collapse>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&>.ant-collapse-item': {
      border: `1px solid ${theme.darkBorderColor}`,
      background: theme.alwaysWhiteForegroundColor,
      'border-radius': '0.75rem',
      'box-shadow': '0 1px 20px 0 rgba(23, 65, 212, 0.02)',
    },
    '&>.ant-collapse-item:not(:last-child)': {
      'margin-bottom': '1.5rem',
    },
    '&.ant-collapse-borderless>.ant-collapse-item:last-child': {
      'border-radius': '0.75rem',
    },
    '&.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow': {
      left: '1.5rem',
    },
    '&.ant-collapse > .ant-collapse-item > .ant-collapse-header': {
      padding: '0',
    },
    '& .ant-collapse-content-box': {
      padding: 0,
      'border-top': `1px solid ${theme.keyColorGrey}`,
      'margin-left': '3rem',
      'margin-right': '1.5rem',
      'padding-left': '10rem',
    },
    '&.ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box': {
      padding: 0,
    },
  },
  header: {
    display: 'flex',
    'align-items': 'center',
    'margin-left': '3rem',
    'margin-right': '1.5rem',
    'padding-top': '1.5rem',
    'padding-bottom': '1.5rem',
  },
  poolName: {
    width: '10rem',
  },
  poolDetail: {
    display: 'flex',
  },
}));

export default RenderPoolsCollapse;
