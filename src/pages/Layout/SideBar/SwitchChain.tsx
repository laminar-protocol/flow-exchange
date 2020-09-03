import clsx from 'clsx';
import React, { useCallback, useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import laminarLogo from '../../../assets/laminar-circle.svg';
import { Dialog, Text } from '../../../components';
import useApp from '../../../store/useApp';

type SwitchAccountProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const SwitchAccount: React.FC<SwitchAccountProps> = ({ visible, onCancel, onOk }) => {
  const classes = useStyles();
  const setApiEnable = useApp(state => state.setApiEnable);
  const api = useApp(state => state.api);
  const currentChain = useMemo(() => {
    if (api?.chainType === 'laminar') {
      //@ts-ignore
      return api?.asLaminar?.apiProvider.api?._runtimeChain?.toString();
    }
    return '';
  }, [api]);
  const [selected, setSelected] = useState(currentChain);

  const selectChain = useCallback(
    chainName => {
      if (chainName === 'Laminar Turbulence PC1') {
        localStorage.setItem('chain', 'Laminar Turbulence PC1');
      } else {
        localStorage.setItem('chain', 'Laminar Turbulence TC1');
      }
      window.location.reload();
    },
    [setApiEnable],
  );

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(() => {
    selected && selectChain(selected);
    return onOk();
  }, [onOk, selected, selectChain]);

  return (
    <Dialog
      title="Choose Networks"
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
        {['Laminar Turbulence TC1', 'Laminar Turbulence PC1'].map(name => {
          return (
            <div
              className={clsx(classes.item, { [classes.selected]: selected === name })}
              key={name}
              onClick={() => setSelected(name)}
            >
              <img src={laminarLogo} width="64px" alt="laminar" />
              <div className={classes.content}>
                <Text size="n" className={classes.contentItem}>
                  {name}
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
      width: '2rem',
      height: '2rem',
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
