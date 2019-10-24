import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import * as theme from 'theme';

import Text from './text';
import Panel from './panel';
import Spinner from './spinner';

const Header = styled.div`
  text-transform: uppercase;
`;

const Main = styled.div`
`;

const Content = styled.div`
  flex: 1;
`;

const Accessory = styled.div`
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const AccessorySpinner = styled(Spinner)`
  &.ant-spin {
    color: ${theme.fadeForegroundColor};
  }
`;

const AccessoryIcon = styled(FontAwesomeIcon)`
  color: ${theme.fadeForegroundColor};
`;

const Container = styled(Panel)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${Header} {
    margin-bottom: 0.5rem;
  }
`;

interface Props {
  radius?: number;
  padding?: number;
  header?: string;
  accessory?: IconProp;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const TextCell: React.FC<Props> = ({
  radius, padding, header, accessory, loading, children, className,
}) => (
  <Container radius={radius} padding={padding} className={className}>
    <Accessory>
      {(accessory && !loading) && <AccessoryIcon icon={accessory} size="2x" />}
      { loading && <AccessorySpinner /> }
    </Accessory>

    <Content>
      {
        header && (
          <Header>
            <Text size="s" light weight="bold">{header}</Text>
          </Header>
        )
      }
      <Main>
        { children }
      </Main>
    </Content>
  </Container>
);

export default TextCell;
