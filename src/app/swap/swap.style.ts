import styled from 'styled-components';

import { Text, Panel } from '../../components';
import * as theme from '../../theme';

export const Container = styled.div``;
export const SwapContainer = styled(Panel)``;

export const Currency = styled.div`
  flex: 1;
  align-self: stretch;
`;

export const Label = styled.div`
  height: 1.5rem;
`;

export const Validation = styled.div`
  height: 1.5rem;
  display: flex;
  align-items: flex-end;
`;

export const ValidationText = styled(Text)`
  color: ${theme.errorForegroundColor};
`;

export const Entry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${theme.respondTo.lg`
    flex-direction: column;
  `};
`;

export const Divider = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.respondTo.lg`
    margin-top: 0rem;
    margin-bottom: 0rem;
  `};
`;

export const ExchangeIcon = styled.div`
  color: ${theme.lightForegroundColor};
  font-size: 1.75rem;
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 0.5rem;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px ${theme.borderColor};
    .normalIcon {
      display: none;
    }
    .swapIcon {
      display: inline;
    }
  }
  &:active {
    box-shadow: 0 0 0 1px ${theme.darkBorderColor};
  }
  .swapIcon {
    display: none;
  }
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${theme.respondTo.sm`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

export const Detail = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  ${theme.respondTo.sm`
    margin-bottom: 1rem;
  `}
`;

export const SwapDetail = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  ${theme.respondTo.lg`
    flex-direction: column;
  `};
`;

export const SwapBalance = styled(Panel)`
  margin-right: 2rem;
  width: 30%;
  ${theme.respondTo.lg`
    width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
  `};
`;

export const SwapListContainer = styled(Panel)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: stretch;
`;
