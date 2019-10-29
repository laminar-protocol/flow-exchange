import React from 'react';
import styled from 'styled-components';

import {
  Text, Separator, Panel, SolidButton, BalanceCell,
} from 'components';
import { tradingPairs } from 'config';

import TradingPair from './tradingPair';

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
  isTogglinigTrading: boolean;
  allowance: string;

  onToggleTrading: (enable: boolean) => void;
}

const Margin: React.FC<Props> = ({
  isEnabled, isLoadingAllowance, isTogglinigTrading, allowance, onToggleTrading,
}) => (
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
        { (isLoadingAllowance || isTogglinigTrading)
          ? <SolidButton loading>{ isLoadingAllowance ? 'Loading Allowance' : 'Updaing Trading' }</SolidButton>
          : <SolidButton onClick={() => onToggleTrading(!isEnabled)}>{isEnabled ? 'Disable Trading' : 'Enable Trading'}</SolidButton> }
        { !isLoadingAllowance && <div>Allowance: {allowance}</div> }
      </div>
    </SummaryPanel>
    <Separator />
    { isEnabled && Object.keys(tradingPairs).map((name) => <TradingPair name={name} key={name} />) }
  </Container>
);

export default Margin;
