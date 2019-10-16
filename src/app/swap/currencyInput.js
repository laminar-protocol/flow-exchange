import React from 'react';
import styled from 'styled-components';
import { Input, Select } from 'antd';

const InputGroup = Input.Group;
const { Option } = Select;

const Container = styled.div`
  margin-top: 0.5rem;
`;

const AmountInput = styled(Input)`
  &.ant-input {
    width: 70% !important;
    font-size: 2rem;
    height: 3.5rem !important;
  }
`;

const CurrencySelect = styled(Select)`
  &.ant-select {
    width: 30%;
    height: 3.5rem !important;
  }

  .ant-select-selection--single {
    height: 3.5rem !important;
  }

  .ant-select-selection__rendered {
    line-height: 3.5rem !important;
  }
`;

const options = (symbols) => {
  if (symbols === null) {
    return [];
  }

  return symbols.map((item) => (
    <Select.Option key={item.value} value={item.value}>
      {item.name}
    </Select.Option>
  ));
};

const Component = ({
  className, disabled, symbols, selected, onCurrencyChange, onAmountChange,
}) => (
  <Container className={className}>
    <InputGroup compact>
      <AmountInput onChange={onAmountChange} disabled={disabled} />
      <CurrencySelect onChange={onCurrencyChange} value={selected} disabled={disabled}>
        { options(symbols) }
      </CurrencySelect>
    </InputGroup>
  </Container>
);

export default Component;
