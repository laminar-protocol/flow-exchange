import React from 'react';
import styled from 'styled-components';

import { theme } from '../styles';
import { IconProp } from '../types';
import Icon from './Icon';
import Spinner from './Spinner';
import Text from './Text';

const Header = styled.div`
  text-transform: uppercase;
`;

const Main = styled.div``;

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

const AccessoryIcon = styled(Icon)`
  color: ${theme.fadeForegroundColor};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${Header} {
    margin-bottom: 0.5rem;
  }
`;

interface Props {
  header?: string;
  accessory?: IconProp;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const TextCell: React.FC<Props> = ({ header, accessory, loading, children, className }) => (
  <Container className={className}>
    <Accessory>
      {accessory && !loading && <AccessoryIcon icon={accessory} size="2x" />}
      {loading && <AccessorySpinner />}
    </Accessory>

    <Content>
      {header && (
        <Header>
          <Text size="s" light weight="bold">
            {header}
          </Text>
        </Header>
      )}
      <Main>{children}</Main>
    </Content>
  </Container>
);

export default TextCell;