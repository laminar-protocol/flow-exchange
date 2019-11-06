import React, { useState } from 'react';
import styled from 'styled-components';

import {
  Text, SolidButton, Separator, Input,
} from 'components';
import { usePriceRate } from 'hooks/useOraclePrice';
import { tradingSymbols, tradingPairs, liquidityPools } from 'config';
import * as theme from 'theme';

import { formatRate } from './format';

const Container = styled.div``;

// ----------
// Interface
// ----------

export interface StateProps {
  isEnabled: boolean;
  isOpening: boolean;
  onClosePosition: (name: string, id: string) => void;
}

type Props = StateProps;

// ----------

const Trade: React.FC<Props> = ({ isEnabled, isOpening, onClosePosition }) => {
  // TODO: Fix type

  return (
    <Container>

    </Container>
  );
};

export default Trade;
