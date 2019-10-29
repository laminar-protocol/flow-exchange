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

interface Props {
  isEnabled: boolean;
  isLoadingAllowance: boolean;
  allowance: number;
}

const Margin: React.FC<Props> = ({ isEnabled, isLoadingAllowance, allowance }) => (
  <Container>
    <Text size="h">Margin Exchange</Text>
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
      <div>
        { isLoadingAllowance
          ? <SolidButton loading>Loading Allowance</SolidButton>
          : <SolidButton>{isEnabled ? 'Disable Trading' : 'Enable Trading'}</SolidButton> }
        { !isLoadingAllowance && <div>Allowance: {allowance}</div> }
      </div>
    </SummaryPanel>
  </Container>
);

export default Margin;
