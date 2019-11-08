import { createGlobalStyle } from 'styled-components';
import * as theme from 'theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    background-color: ${theme.backgroundColor} !important;
  }

  #root {
    color: ${theme.foregroundColor};
    line-height: 1;
    background-color: ${theme.backgroundColor};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  a {
    color: ${theme.foregroundColor} !important;
  }

  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.25) !important;
  }

  .ant-modal-content {
    background-color: ${theme.backgroundColor} !important;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.05) !important;
    color: ${theme.foregroundColor};
    border-radius: 0.5rem !important;
  }
`;

export default GlobalStyle;
