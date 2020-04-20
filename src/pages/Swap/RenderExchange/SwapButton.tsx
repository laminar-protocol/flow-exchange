import React from 'react';
import { createUseStyles } from 'react-jss';

import { PrimaryButton } from '../../../components';

type SwapButtonProps = React.ComponentProps<typeof PrimaryButton>;

const SwapButton: React.FC<SwapButtonProps> = ({ ...other }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrimaryButton size="large" {...other}>
        Swap
      </PrimaryButton>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-end',
    'margin-left': '1.5rem',
  },
}));

export default SwapButton;
