import React from 'react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { Title } from '../Typography';
import { Row } from '../Layouts';
import { BaseProps } from '../../types';

type PanelProps = {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  padding?: number | string;
  radius?: number | string;
};

const Panel: React.FC<BaseProps & PanelProps & React.HTMLProps<HTMLDivElement>> = ({
  title,
  actions,
  className,
  radius,
  padding,
  children,
  ...other
}) => {
  const classes = useStyles({
    radius,
    padding,
  });

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.noTitleTable]: !title,
        },
        className,
      )}
      {...other}
    >
      <Row justify="space-between" align="middle">
        {title ? (
          <Title type="panel" className={classes.title}>
            {title}
          </Title>
        ) : null}
        {actions ? actions : null}
      </Row>
      {children}
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    border: `1px solid ${theme.borderColor}`,
    padding: (props: PanelProps) => props.padding || '0',
    borderRadius: (props: PanelProps) => props.radius || '0.75rem',
    boxShadow: '0 1px 20px 0 rgba(23, 65, 212, 0.02)',
    backgroundColor: theme.lightBackgroundColor,
    overflow: 'hidden',
  },
  title: {
    margin: '1.25rem 1rem',
    'font-size': '1.25rem',
  },
  noTitleTable: {
    '& .ant-table-wrapper .ant-table thead > tr > th': {
      'border-top': 'none',
    },
    '& .ant-table-wrapper .ant-table-container table > thead > tr:first-child th:first-child': {
      'border-top-left-radius': '0.75rem',
    },
    '& .ant-table-wrapper .ant-table-container table > thead > tr:first-child th:last-child': {
      'border-top-right-radius': '0.75rem',
    },
  },
}));

export default Panel;
