import React from 'react';
import { Table as AntdTable } from 'antd';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

type TableProps = React.ComponentProps<typeof AntdTable> & {
  hideHeader?: boolean;
  variant?: 'panelTable';
};

const Table: React.FC<TableProps> = ({ hideHeader, className, variant, onRow, ...other }) => {
  const classes = useStyles({
    onRow,
  });

  return (
    <AntdTable
      onRow={onRow}
      scroll={{ x: true }}
      className={clsx(className, classes.root, {
        [classes.hideHeader]: hideHeader,
        [classes.panelTable]: variant === 'panelTable',
      })}
      pagination={false}
      {...other}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '& .ant-table thead > tr > th': {
      background: theme.lightBackgroundColor,
      padding: '1rem 1rem',
      'font-size': '1rem',
      'border-top': `solid 1px ${theme.keyColorGrey}`,
      'border-bottom': `solid 1px ${theme.keyColorGrey}`,
    },
    '& .ant-table tbody > tr > td': {
      color: theme.textColor.greyColor3,
      padding: '1rem 1rem',
      'font-size': '1rem',
    },
    '& .ant-table-column-sorters': {
      padding: 0,
    },
    '& .ant-table-thead th.ant-table-column-has-sorters': {
      cursor: 'pointer',
    },
    '& .ant-table-tbody > tr.ant-table-row:hover > td': {
      background: (props: any) => (props?.onRow ? theme.backgroundHoverColor : 'none'),
    },
    '& .ant-table-container': {
      'border-top-left-radius': 0,
      'border-top-right-radius': 0,
    },
  },
  panelTable: {
    '& .ant-table tbody > tr:last-child > td': {
      'border-bottom': 'none',
    },
    '& .ant-table-pagination': {
      'margin-right': '1rem',
    },
    '& .ant-table-container table > thead > tr:first-child th:first-child': {
      'border-top-left-radius': '0',
    },
    '& .ant-table-container table > thead > tr:first-child th:last-child': {
      'border-top-right-radius': '0',
    },
  },
  hideHeader: {
    '& .ant-table-thead': {
      display: 'none',
    },
    '& .ant-table': {
      'border-top': `solid 1px ${theme.keyColorGrey}`,
    },
  },
}));

export default Table;
