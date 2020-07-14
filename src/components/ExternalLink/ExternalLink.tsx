import React from 'react';
import { BaseProps } from '../../types';

type ExternalLinkProps = {
  to: string;
} & BaseProps &
  React.HTMLProps<HTMLLinkElement>;

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, to }) => {
  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
