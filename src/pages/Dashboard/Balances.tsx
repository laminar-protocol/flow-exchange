import React from 'react';
import { createUseStyles } from 'react-jss';
import { Balance, Panel, Separator, Spinner, Text, TextCell } from '../../components';
import { useApp } from '../../store/useApp';
import { useAccount } from '../../store/useAccount';
import { getTokenIcon } from '../../utils';

const Balances: React.FC = () => {
  const classes = useStyles();

  const tokens = useApp(state => state.tokens);
  const balances = useAccount(state => state.data);

  return (
    <Panel className={classes.root} padding="1.5rem">
      <Text size="l">Balances</Text>
      <Separator size={1} />
      {balances.length ? (
        tokens?.map(token => {
          return (
            <div className="item" key={token.name}>
              <TextCell header={`${token.name} Balance`} accessory={getTokenIcon(token.name)}>
                <Text weight="bold" size="l">
                  <Balance tokenId={token.id} hasPrefix />
                </Text>
              </TextCell>
            </div>
          );
        })
      ) : (
        <Spinner type="full" />
      )}
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
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
