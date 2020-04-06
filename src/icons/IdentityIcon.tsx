import React from 'react';
import BaseIdentityIcon from '@polkadot/react-identicon';

type BaseIdentityIconProps = React.ComponentProps<typeof BaseIdentityIcon>;

const IdentityIcon: React.FC<BaseIdentityIconProps> = ({ ...other }) => {
  return <BaseIdentityIcon {...other} />;
};

export default IdentityIcon;
