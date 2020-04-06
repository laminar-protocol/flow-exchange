import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Panel, Separator, Spinner, Text } from '../../components';
import { useAccount } from '../../hooks/useAccount';
import { useApp } from '../../hooks/useApp';
import Balance from './Balance';

const Balances: React.FC = () => {
  const classes = useStyles();
  const tokens = useApp(state => state.tokens);
  const currentAccount = useApp(state => state.currentAccount);
  const updateBalances = useAccount(state => state.updateBalances);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateBalances && currentAccount?.address) {
      setLoading(true);
      updateBalances(currentAccount.address).finally(() => {
        setLoading(false);
      });
    }
  }, [currentAccount?.address]);

  return (
    <Panel className={classes.root} padding="1.5rem">
      <Text size="l">Balances</Text>
      <Separator size={1} />
      {loading ? (
        <Spinner type="full" />
      ) : (
        tokens?.map(token => {
          return (
            <div className="item" key={token.name}>
              <Balance token={token} />
            </div>
          );
        })
      )}
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: '35%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },

    '& div:last-child': {
      borderBottom: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },

    '& .item': {
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
      borderBottom: `1px solid ${theme.borderColor}`,
      paddingBottom: '1.5rem',
    },
  },
}));

export default Balances;
