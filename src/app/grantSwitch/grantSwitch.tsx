import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Text, Spinner } from 'components';
import * as theme from 'theme';

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
    .anticon, svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export interface OwnProps {
  symbol: string;
  visibleGranted?: boolean;
}

interface Props extends OwnProps {
  isQueryingAuthorization: boolean;
  isGranting: boolean;
  granted: boolean;

  onGrant: (symbol: string, granted: boolean) => void;
  onQuery: (symbol: string) => void;

  className?: string;
}

const GrantSwitch: React.FC<Props> = ({
  symbol,
  isQueryingAuthorization,
  isGranting,
  granted,
  className,
  visibleGranted,
  onGrant,
  onQuery,
}) => {
  const loading = isGranting || isQueryingAuthorization;

  useEffect(() => {
    onQuery(symbol);
  }, [onQuery, symbol]);

  if (!isQueryingAuthorization && !visibleGranted && granted) {
    return null;
  }

  return (
    <Container className={className} onClick={() => { onGrant(symbol, granted); }}>
      { loading ? <LockSpinner /> : <LockIcon icon="lock" /> }
      { !isQueryingAuthorization && <LockText light>Enable Trading</LockText> }
    </Container>
  );
};

export default GrantSwitch;
