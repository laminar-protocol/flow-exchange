import styled from 'styled-components';
import * as theme from 'theme';

const Component = styled.span`
  font-size: ${(props) => {
    switch (props.size) {
      case 's':
        return theme.textSmallSize;
      case 'l':
        return theme.textLargeSize;
      case 't':
        return theme.textTitleSize;
      case 'h':
        return theme.textHeaderSize;
      default:
        return theme.textNormalSize;
    }
  }};
  font-weight: ${(props) => {
    switch (props.weight) {
      case 'bold':
        return theme.boldWeight;
      case 'black':
        return theme.blackWeight;
      default:
        return theme.normalWeight;
    }
  }};
  color: ${(props) => (props.light ? theme.lightForegroundColor : theme.foregroundColor)};
`;

export default Component;
