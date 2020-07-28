import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import { MenuMarginIcon, MenuDepositIcon, MenuLiquidityIcon, MenuSwapIcon } from '../../icons';

const Links: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to="/margin" className={classes.linkItem}>
        <div className={classes.item}>
          <MenuMarginIcon className={classes.linkIcon} />
          <div className={classes.title}>
            Margin Trading
            <div className={classes.description}>Leveraged trading up to 50×</div>
          </div>
        </div>
      </Link>
      <Link to="/swap" className={classes.linkItem}>
        <div className={classes.item}>
          <MenuSwapIcon className={classes.linkIcon} />
          <div className={classes.title}>
            Spot Exchange
            <div className={classes.description}>Synthetic assets, infinite liquidity</div>
          </div>
        </div>
      </Link>
      <Link to="/provider" className={classes.linkItem}>
        <div className={classes.item}>
          <MenuLiquidityIcon className={classes.linkIcon} />
          <div className={classes.title}>
            Liquidity Provider
            <div className={classes.description}>Become a counter party &amp; earn</div>
          </div>
        </div>
      </Link>
      <Link to="/lending" className={classes.linkItem}>
        <div className={classes.item}>
          <MenuDepositIcon className={classes.linkIcon} />
          <div className={classes.title}>
            Deposit &amp; Earn
            <div className={classes.description}>Earn interest on synthetic assets</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
const useStyles = createUseStyles(theme => ({
  root: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
    'align-items': 'center',
    'flex-wrap': 'wrap',
    'margin-top': '2rem',
  },
  linkItem: {
    width: '50%',
    '&:nth-child(1)': {
      'border-bottom': `1px solid ${theme.borderColor}`,
      'border-right': `1px solid ${theme.borderColor}`,
    },
    '&:nth-child(2)': {
      'border-bottom': `1px solid ${theme.borderColor}`,
    },
    '&:nth-child(3)': {
      'border-right': `1px solid ${theme.borderColor}`,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      border: 'none !important',
      'border-bottom': `1px solid ${theme.borderColor} !important`,
    },
    '&:hover $description': {
      color: 'inherit',
    },
  },
  item: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
    'align-items': 'center',

    padding: '3rem 1rem',
  },

  linkIcon: {
    width: '2rem',
    'font-size': '2rem',
    'margin-right': '1.5rem',
  },

  title: {
    'font-weight': `${theme.boldWeight}`,
    'font-size': '1.25rem',
  },

  description: {
    'margin-top': '0.5rem',
    'font-size': `${theme.textNormalSize}`,
    'font-weight': `${theme.normalWeight}`,
    color: `${theme.lightForegroundColor}`,
  },
}));

export default Links;
