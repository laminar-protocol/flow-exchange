import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { BaseProps, IconProp } from '../../types';
import Icon from '../Icon';
import { Spinner } from '../Spinner';
import Text from './Text';

interface TextCellProps {
  header?: string;
  accessory?: IconProp;
  loading?: boolean;
}

const TextCell: React.FC<TextCellProps & BaseProps> = ({
  header,
  accessory,
  loading,
  children,
  className,
  ...other
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)} {...other}>
      <div className={classes.accessory}>
        {accessory && !loading && <Icon className={classes.accessoryIcon} icon={accessory} size="2x" />}
        {loading && <Spinner className={classes.accessorySpinner} />}
      </div>

      <div className={classes.content}>
        {header && (
          <div className={classes.header}>
            <Text size="s" light weight="bold">
              {header}
            </Text>
          </div>
        )}
        <div className={classes.main}>{children}</div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',

    '& $header': {
      'margin-bottom': '0.5rem',
    },
  },
  header: {
    'text-transform': 'uppercase',
  },
  main: {},
  content: {
    flex: 1,
  },
  accessory: {
    width: '1.5rem',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'margin-right': '1rem',
  },
  accessorySpinner: {
    '&.ant-spin': {
      color: theme.fadeForegroundColor,
    },
  },
  accessoryIcon: {
    color: theme.fadeForegroundColor,
  },
}));

export default TextCell;
