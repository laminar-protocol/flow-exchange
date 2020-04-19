import { IconProp as FontAwesomeIconProp } from '@fortawesome/fontawesome-svg-core';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  component?: React.ElementType;
  render?: (value?: any) => React.ReactNode;
}

export type IconProp = FontAwesomeIconProp;
