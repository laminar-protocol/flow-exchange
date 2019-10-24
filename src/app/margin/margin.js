import React from 'react';
import styled from 'styled-components';

import {
  Text, Separator, Panel, SolidButton, BalanceCell,
} from 'components';

const Container = styled.div`
`;

const SummaryPanel = styled(Panel)`
  display: flex;
`;

const Summary = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const Margin = () => (
  <Container>
    <Text size="h">Spot Exchange</Text>
    <Separator />
    <SummaryPanel>
      <Text size="l">Account Summary</Text>
      <Summary>
        <BalanceCell
          value="123"
          text="Balance"
        />
        <BalanceCell
          value="123"
          text="P/L"
        />
        <BalanceCell
          value="123"
          text="Equity"
        />
      </Summary>
      <SolidButton>Enable Trading</SolidButton>
    </SummaryPanel>
  </Container>
);

export default Margin;
