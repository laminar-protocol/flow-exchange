import { createUseStyles } from 'react-jss';

const useGlobalStyles = createUseStyles(theme => ({
  '@global': {
    body: {
      margin: '0',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",\n    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontWeight: 'normal',
      backgroundColor: theme.backgroundColor,
    },
    '#root': {
      height: '100%',
      color: theme.foregroundColor,
      lineHeight: '1',
      backgroundColor: theme.backgroundColor,
    },
    code: {
      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    a: {
      color: theme.foregroundColor,
    },
    '.ant-layout': {
      backgroundColor: theme.backgroundColor,
    },
    '.ant-modal-mask': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    '.ant-modal-content': {
      backgroundColor: `${theme.backgroundColor}`,
      boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.05) !important',
      color: theme.foregroundColor,
      borderRadius: '0.5rem',
    },
    '.ant-modal-header': {
      backgroundColor: `${theme.backgroundColor}`,
      borderRadius: '0.5rem',
    },
    '.ant-notification-notice-description': {
      wordBreak: 'break-all',
    },
  },
}));

export default useGlobalStyles;
