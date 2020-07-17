import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Dialog, Text } from '../../../components';
import { IdentityIcon } from '../../../icons';
import useApp from '../../../store/useApp';

type SwitchAccountProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const SwitchAccount: React.FC<SwitchAccountProps> = ({ visible, onCancel, onOk }) => {
  const classes = useStyles();
  const setState = useApp(state => state.setState);

  const currentAccount = useApp(state => state.currentAccount);
  const accountList = useApp(state => state.accountList);
  const [selected, setSelected] = useState(currentAccount?.address);

  const selectAccount = useCallback(
    accountAddress => {
      setState(state => {
        const account = accountList.find(({ address }) => accountAddress === address);
        if (!account) return null;
        localStorage.setItem('LAST_LAMINAR_ACCOUNT', account.address);
        state.currentAccount = account;
      });
    },
    [setState, accountList],
  );

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(() => {
    selected && selectAccount(selected);
    return onOk();
  }, [onOk, selected, selectAccount]);

  if (!currentAccount) return null;

  return (
    <Dialog
      title="Choose different account"
      visible={visible}
      onOk={() => handleSubmit()}
      width="35rem"
      okButtonProps={{
        disabled: !selected,
      }}
      onCancel={() => handleCancel()}
      style={{ top: 200 }}
    >
      <div className={classes.list}>
        {accountList.map(({ address, name }) => {
          return (
            <div
              className={clsx(classes.item, { [classes.selected]: selected === address })}
              key={address}
              onClick={() => setSelected(address)}
            >
              <IdentityIcon size={32} value={address} />
              <div className={classes.content}>
                <Text size="n" className={classes.contentItem}>
                  {name}
                </Text>
                <Text size="n" className={classes.contentItem}>
                  {address}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Dialog>
  );
};

const useStyles = createUseStyles(theme => ({
  list: {
    borderRadius: 2,
    border: `solid 1px ${theme.borderColor}`,
  },
  item: {
    cursor: 'pointer',
    paddingLeft: '1rem',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: '1rem',
      height: '1rem',
    },
    '&$selected': {
      background: theme.backgroundColor,
    },
    '&:last-child $content': {
      borderBottom: 'none',
    },
  },
  selected: {},
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    flex: 1,
    marginLeft: '1rem',
    borderBottom: `solid 1px ${theme.borderColor}`,
  },
  contentItem: {
    fontSize: '0.875rem',
  },
}));

export default SwitchAccount;
