export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  component?: React.ElementType;
  render?: (value?: any) => React.ReactNode;
}
