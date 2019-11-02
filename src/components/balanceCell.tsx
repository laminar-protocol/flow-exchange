import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import {
  Text, TextCell, NumberFormat,
} from 'components';


interface Props {
  value: string;
  text: string;
  loading?: boolean;
  accessory?: IconProp;
  prefix?: string;
}

const BalanceCell: React.FC<Props> = ({ value, text, loading = false, accessory, prefix }) => (
  <TextCell header={text} accessory={accessory} loading={loading}>
    <Text weight="bold" size="l">
      <NumberFormat value={value} prefix={prefix} />
    </Text>
  </TextCell>
);

export default BalanceCell;
