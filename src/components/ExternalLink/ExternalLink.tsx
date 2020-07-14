import React from 'react';

import { BaseProps } from '../../types';
import { Text } from '../Typography';

type ExternalLinkProps = {
  to: string;
} & BaseProps &
  React.HTMLProps<HTMLLinkElement>;

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, to }) => {
  return (
    <a href={to} target="_blank">
      {children}
    </a>
  );
};

export default ExternalLink;
