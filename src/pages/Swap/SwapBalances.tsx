import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Panel, Separator, Spinner, Text } from '../../components';
import { useAccount } from '../../hooks/useAccount';
import { useApp } from '../../hooks/useApp';
import BalanceLine from './BalanceLine';

const SwapBalances: React.FC = () => {
  const classes = useStyles();
  const tokens = useApp(state => state.tokens);
  const updateBalances = useAccount(state => state.updateBalances);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    updateBalances().finally(() => {
      setLoading(false);
    });
  }, [updateBalances]);

  return (
    <Panel className={classes.root}>
      <Text size="l">Balances</Text>
      <Separator size={1} />
      {loading ? <Spinner type="full" /> : tokens?.map(token => <BalanceLine token={token} key={token.name} />)}
    </Panel>
  );
};

export const useStyles = createUseStyles(theme => ({
  root: {
    marginRight: '2rem',
    width: '30%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      marginRight: 0,
      marginBottom: '2rem',
    },
  },
}));

export default SwapBalances;
