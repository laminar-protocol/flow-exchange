import React, { useCallback, useState } from 'react';
import { Modal as AntdModal } from 'antd';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import { DefaultButton } from '../Buttons';

type AntdModalProps = React.ComponentProps<typeof AntdModal>;

type DialogProps = {
  onOk: () => void;
  onCancel: () => void;
};

const Dialog: React.FC<AntdModalProps & DialogProps> = ({
  onOk,
  okText,
  cancelText,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  className,
  ...other
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleOk = useCallback(async () => {
    setLoading(true);
    try {
      await onOk();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [onOk]);

  return (
    <AntdModal
      transitionName="none"
      maskTransitionName="none"
      width="30rem"
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      className={clsx(classes.root, className)}
      footer={[
        <DefaultButton key="cancel" className={classes.cancelButton} onClick={handleCancel} {...cancelButtonProps}>
          {okText || t('Cancel')}
        </DefaultButton>,
        <DefaultButton
          key="submit"
          className={classes.confirmButton}
          type="primary"
          loading={loading}
          onClick={handleOk}
          {...okButtonProps}
        >
          {okText || t('Confirm')}
        </DefaultButton>,
      ]}
      {...other}
    />
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    background: theme.lightBackgroundColor,
    borderRadius: 2,
    '& .ant-modal-content': {
      background: theme.lightBackgroundColor,
    },
    '&.ant-modal': {
      padding: 0,
    },
    '& .ant-modal-title': {
      fontSize: '1.5rem',
      fontWeight: 'normal',
      color: theme.foregroundColor,
    },
    '& .ant-modal-close-x': {
      fontSize: '1.25rem',
    },
    '& .ant-modal-header': {
      borderBottom: 'none',
    },
    '& .ant-modal-footer': {
      borderTop: 'none',
      padding: '1rem 1.5rem 1.5rem',
    },
    '& .ant-modal-body': {
      padding: '0 1.5rem',
    },
    '& .ant-modal-footer button + button': {
      marginLeft: '1.25rem',
    },
  },
  cancelButton: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: 0,
      fontWeight: theme.boldWeight,
      color: theme.foregroundColor,
      background: '#ecf0f2',
    },
  },
  confirmButton: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: 0,
      fontWeight: theme.boldWeight,
      color: theme.alwaysWhiteForegroundColor,
      background: theme.keyColorBlue,
    },
  },
}));

export default Dialog;
