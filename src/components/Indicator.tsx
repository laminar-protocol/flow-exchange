import styled from 'styled-components';

import { theme } from '../styles';

interface IndicatorProps {
  size?: number;
}

const Indicator = styled.span<IndicatorProps>`
  background-color: ${props => {
    switch (props.color) {
      case 'green':
        return theme.indicatorGreenColor;
      case 'yellow':
        return theme.indicatorYellowColor;
      default:
        return theme.indicatorGrayColor;
    }
  }};
  width: ${props => props.size || 10}px;
  height: ${props => props.size || 10}px;
  border-radius: ${props => (props.size || 10) / 2}px;
`;

export default Indicator;
