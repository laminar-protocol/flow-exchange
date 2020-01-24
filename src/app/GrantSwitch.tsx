import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Text, Spinner } from '../components';
import * as theme from '../theme';
import types from '../types';
import { getAuthorization, getIsQueryingAuthorization, getIsGranting } from '../reducers/token.reducer';
import { useDispatch, useShallowEqualSelector } from '../hooks';
import { UINT256_MAX, UINT256_MIN } from '../helpers/unitHelper';
// ----------
// Styles
// ----------

const Container = styled.div`
  display: flex !important;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: ${theme.backgroundColor};
  color: ${theme.foregroundColor};
  border: 1px solid ${theme.borderColor};
  cursor: pointer;
`;

const LockText = styled(Text)`
  margin-left: 0.5rem;
`;

const LockIcon = styled(FontAwesomeIcon)`
  width: 1rem !important;
`;

const LockSpinner = styled(Spinner)`
  &.ant-spin {
    color: ${theme.foregroundColor};
    font-size: 1rem !important;
    line-height: 1rem;
    .anticon,
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

// ----------
// Interface
// ----------

export type Props = {
  symbol: string;
  visibleGranted?: boolean;
  className?: string;
};

export type StateProps = {
  isQueryingAuthorization: boolean;
  isGranting: boolean;
  granted: boolean;
};

// ----------

const GrantSwitch: React.FC<Props> = ({ symbol, visibleGranted, className }) => {
  const dispatch = useDispatch();

  const { isQueryingAuthorization, isGranting, granted } = useShallowEqualSelector<AppState, StateProps>(
    ({ token }: AppState) => {
      const authorization = getAuthorization(symbol, token);
      const isGranting = getIsGranting(symbol, token);
      const isQueryingAuthorization = getIsQueryingAuthorization(symbol, token);

      let granted = true;
      if (authorization && Number(authorization) <= 0) {
        granted = false;
      }

      return {
        isQueryingAuthorization,
        isGranting,
        granted,
      };
    },
  );

  const onQuery = useCallback(
    (symbol: string) => {
      dispatch({ type: types.token.authorization.requested, payload: { symbol } });
    },
    [dispatch],
  );

  const onGrant = useCallback(
    (symbol: string, granted: boolean) => {
      if (granted) {
        dispatch({ type: types.token.grant.requested, payload: { symbol, balance: UINT256_MIN } });
      } else {
        dispatch({ type: types.token.grant.requested, payload: { symbol, balance: UINT256_MAX } });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    onQuery(symbol);
  }, [onQuery, symbol]);

  const loading = isGranting || isQueryingAuthorization;

  if (!isQueryingAuthorization && !visibleGranted && granted) {
    return null;
  }

  return (
    <Container
      className={className}
      onClick={() => {
        onGrant(symbol, granted);
      }}
    >
      {loading ? <LockSpinner /> : <LockIcon icon="lock" />}
      {!isQueryingAuthorization && <LockText light>Enable Trading</LockText>}
    </Container>
  );
};

export default GrantSwitch;
