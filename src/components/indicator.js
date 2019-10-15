import styled from 'styled-components';
import * as theme from 'theme';

const Component = styled.span`
  background-color: ${(props) => {
    switch (props.color) {
      case 'green':
        return theme.indicatorGreenColor;
      case 'yellow':
        return theme.indicatorYellowColor;
      default:
        return theme.indicatorGrayColor;
    }
  }};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
`;

export default Component;
