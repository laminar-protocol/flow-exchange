import React from 'react';

import { BaseProps } from '../../types';
import { Text } from '../Typography';

type ExternalLinkProps = {
  value: string;
  type?: '';
  isLink?: boolean;
};

const ExternalLink: React.FC<ExternalLinkProps & BaseProps & React.HTMLProps<HTMLLinkElement>> = ({
  value,
  isLink = true,
}) => {
  return (
    <a href="" target="_blank">
      <Text ellipsisi>{value}</Text>
    </a>
  );
};

export default ExternalLink;
