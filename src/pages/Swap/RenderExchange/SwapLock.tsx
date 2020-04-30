import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import { Text } from '../../../components';
import { useApi, useCurrentAccount } from '../../../hooks';
import { BaseProps } from '../../../types';
import { notificationHelper } from '../../../utils';
import useSwap from '../hooks/useSwap';

type SwapLockProps = {
  tokenId?: string;
};

const SwapLock: React.FC<SwapLockProps & BaseProps> = ({ className, tokenId, ...other }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const api = useApi();
  const { address } = useCurrentAccount();
  const setState = useSwap(state => state.setState);

  const grant = useCallback(async () => {
    if (api.isLaminar || !tokenId) return;

    try {
      await notificationHelper(api.asEthereum.synthetic.grant(address, tokenId));
    } finally {
      setState(state => {
        state.tokensAllowanceUpdate = state.tokensAllowanceUpdate + 1;
      });
    }
  }, [api, address, setState, tokenId]);

  return (
    <div className={classes.root} onClick={() => grant()}>
      <svg
        style={{ width: '1.5rem', marginTop: -2, marginRight: '0.5rem' }}
        x="0px"
        y="0px"
        width="48.184px"
        height="48.184px"
        fill="#3c3d5e"
        viewBox="0 0 48.184 48.184"
      >
        <g>
          <path d="M47.494,22.599L26.267,1.485c-1.196-1.191-3.155-1.191-4.352,0L0.689,22.599c-1.197,1.19-0.794,2.165,0.893,2.165h4.895v15.888c0,3.817,3.122,6.94,6.94,6.94h21.349c3.818,0,6.94-3.123,6.94-6.94V24.764h4.896C48.29,24.764,48.692,23.79,47.494,22.599zM29.738,39.607h-11.29l2.52-12.142c-2.159-1.133-3.649-3.37-3.649-5.978c0-3.741,3.034-6.773,6.775-6.773s6.771,3.033,6.771,6.773c0,2.608-1.489,4.847-3.649,5.979L29.738,39.607z" />
        </g>
      </svg>

      <Text size="l">{t('Enable Trading')}</Text>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    extend: theme.flexCenter,
    cursor: 'pointer',
    background: theme.fadeForegroundColor,
  },
}));

export default SwapLock;
