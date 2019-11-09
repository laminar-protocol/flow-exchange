import styled from 'styled-components';
import { Radio } from 'antd';

import * as theme from 'theme';

const StyledRadioGroup = styled(Radio.Group)`
  /* &.ant-radio-group {
  }

  .ant-radio-button-input {
    display: none;
  }

  .ant-radio-button-wrapper {
    background-color: ${theme.backgroundColor} !important;
    border: 0 !important;
    padding: 2px !important;
    border: 0 !important;
    margin: 0 !important;
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    box-shadow: none !important;
  }

  .ant-radio-button-wrapper {
    color: ${theme.foregroundColor} !important;
    height: 100%;
  }

  .ant-radio-button-wrapper,
  .ant-radio-button-wrapper-checked {
    span {
      display: block;
      padding: 0 2rem;
    }
  }

  .ant-radio-button-wrapper-checked  {
    span {
      background-color: ${theme.whiteForegroundColor};
      border-radius: 0.25rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  } */

  &.ant-radio-group {
    display: block;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .ant-radio-button-input {
    display: none;
  }

  .ant-radio-button-wrapper {
    align-self: stretch;
    flex: 1;
    background-color: ${theme.backgroundColor} !important;
    display: block;
    border: 0 !important;
    padding: 2px !important;
    border: 0 !important;
    margin: 0 !important;
  }

  .ant-radio-button-wrapper:not(:first-child)::before {
    width: 0px;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    box-shadow: none !important;
  }

  .ant-radio-button-wrapper {
    color: ${theme.foregroundColor} !important;
    height: 100%;
  }

  .ant-radio-button-wrapper,
  .ant-radio-button-wrapper-checked {
    span {
      display: block;
      padding: 0 2rem;
      text-align: center;
    }
  }

  .ant-radio-button-wrapper-checked  {
    span {
      background-color: ${theme.whiteForegroundColor};
      border-radius: 0.25rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default StyledRadioGroup;
