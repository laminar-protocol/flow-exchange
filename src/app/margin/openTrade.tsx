import React, { useCallback } from 'react';
import styled from 'styled-components';

import { LightButton, FormatProfit, FormatRate } from '../../components';
import { findTradingPairByAddress, findTradingInfoByPairAddress, explorer } from '../../config';
import * as theme from '../../theme';
import { calculateRate } from './rate';
import { actions } from '../../types';
import { AppState } from '../../reducers';
import { usePriceRate, useDispatch, useShallowEqualSelector } from '../../hooks';

// ----------
// Style
// ----------

const Container = styled.div``;

const ListRow = styled.div`
  color: ${theme.foregroundColor};
  border-bottom: 1px solid ${theme.borderColor};

  padding-bottom: 1rem;
  padding-top: 1rem;
  font-size: ${theme.textSmallSize};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${theme.respondTo.sm`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .column {

      width: 25% !important;
      text-align: left !important;
      margin: 0.25rem 0;
    }
  `};

  .column {
    width: 12.5%;
  }

  .action {
    text-align: right;
  }

  .profit {
    font-weight: ${theme.boldWeight};
    text-align: right;
  }

  .direction {
    text-transform: uppercase;
  }
`;

// ----------
// Interface
// ----------
export type Props = {
  amount: string;
  closeSpread: string;
  liquidationFee: string;
  liquidityPool: string;
  openPrice: string;
  pair: string;
  positionId: number;
  openTxhash: string;
};

export type StateProps = {
  isEnabled: boolean;
  isOpening: boolean;
  isClosing: boolean;
};

// ----------

const OpenTrade: React.FC<Props> = ({
  amount,
  closeSpread,
  liquidationFee,
  openPrice,
  pair,
  positionId,
  openTxhash,
}) => {
  const dispatch = useDispatch();

  // TODO: Fix type
  const tradingPair: any = findTradingPairByAddress(pair);
  const symbolInfo: any = findTradingInfoByPairAddress(pair);

  const { symbol: tradingSymbol, direction } = symbolInfo;
  const { data: rate } = usePriceRate(tradingPair.quote, tradingPair.base);
  const openRate = calculateRate(0, tradingSymbol.inverted, direction, Number(openPrice));

  const { isEnabled, isOpening, isClosing } = useShallowEqualSelector<AppState, StateProps>(
    ({ margin: { allowance, openPosition, closePosition } }: AppState) => {
      const allowanceValue = allowance.value || 0;
      return {
        isEnabled: allowanceValue > 0,
        isOpening: openPosition.loading,
        isClosing: closePosition.loading,
      };
    },
  );
  const onClosePosition = useCallback(
    (name: string, id: string) => {
      dispatch(actions.margin.closePosition.requested({ params: { name, id } }));
    },
    [dispatch],
  );

  // TODO: Refactor and common inverted logics
  let profit;
  if (rate && tradingPair) {
    const spreadValue = Number(closeSpread);
    const spread = tradingPair.leverage > 0 ? spreadValue : -spreadValue;
    const open = Number(openPrice);
    const close = rate * (1 - spread);
    const delta = (close - open) / open;
    profit = delta * tradingPair.leverage * (Number(amount) - Number(liquidationFee));
  }

  return (
    <Container>
      <ListRow>
        <div className="column pair">{tradingSymbol.name}</div>

        <div className="column direction">{direction}</div>

        <div className="column lerverage">{Math.abs(Number(tradingPair.leverage))}×</div>

        <div className="column amount">
          <FormatProfit value={amount} />
        </div>

        <div className="column openPrice">
          <a href={`${explorer}/tx/${openTxhash}`} target="_blank" rel="noopener noreferrer">
            <FormatRate value={openRate} options={{ mantissa: tradingSymbol.precision }} />
          </a>
        </div>

        <div className="column closePrice">&nbsp;</div>

        <div className="column profit">{profit !== undefined ? <FormatProfit value={profit} /> : '—'}</div>
        <div className="column action">
          <LightButton
            size="small"
            disabled={!isEnabled || isClosing || isOpening}
            onClick={() => {
              onClosePosition(tradingPair.symbol, positionId.toString());
            }}
          >
            Close
          </LightButton>
        </div>
      </ListRow>
    </Container>
  );
};

export default OpenTrade;
