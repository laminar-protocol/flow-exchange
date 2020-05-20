import clsx from 'clsx';
import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { Collapse, CollapsePanel, Description, PoolName, Text, NumberFormat, PrimaryButton } from '../../components';
import { RenderDepositModal, RenderWithdrawModal } from './RenderDepositModal';

type RenderPoolsCollapseProps = {
  data: {
    poolId: string;
    detail: {
      label: ReactNode;
      value: ReactNode;
      width?: string;
    }[];
    options: {
      id: string;
      askSpread: string;
      bidSpread: string;
    }[];
  }[];
  handleDeposit: (address: string, poolId: string, amount: string) => Promise<void>;
  handleWithdraw: (address: string, poolId: string, amount: string) => Promise<void>;
};

const RenderPoolsCollapse: React.FC<RenderPoolsCollapseProps> = ({ data, handleDeposit, handleWithdraw }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<{
    type: 'deposit' | 'withdraw' | '';
    data: {
      poolId: string;
    };
  }>({
    type: '',
    data: {
      poolId: '',
    },
  });

  const closeModal = () => {
    setShowModal({
      type: '',
      data: {
        poolId: '',
      },
    });
  };

  return (
    <Collapse className={classes.root}>
      {data.map(({ poolId, detail, options }) => (
        <CollapsePanel
          key={poolId}
          header={
            <div className={classes.header}>
              <Text size="l" className={classes.poolName}>
                <PoolName type="margin" value={poolId} />
              </Text>
              <div className={classes.poolDetail}>
                {detail &&
                  detail.map(({ label, value, width }, index) => (
                    <div key={index} className={classes.item}>
                      <Description label={<Text>{label}</Text>} layout="vertical">
                        <Text color="greyColor3" ellipsisi style={{ maxWidth: width || '100%' }}>
                          {value}
                        </Text>
                      </Description>
                    </div>
                  ))}
                <div className={clsx(classes.item, classes.action)}>
                  <div
                    className={classes.actionDeposit}
                    onClick={e => {
                      e.stopPropagation();
                      setShowModal({
                        type: 'deposit',
                        data: {
                          poolId,
                        },
                      });
                    }}
                  >
                    {t('Deposit')}
                  </div>
                </div>
                <div className={clsx(classes.item, classes.action)}>
                  <div
                    className={classes.actionWidthdraw}
                    onClick={e => {
                      e.stopPropagation();
                      setShowModal({
                        type: 'withdraw',
                        data: {
                          poolId,
                        },
                      });
                    }}
                  >
                    {t('Withdraw')}
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <div className={classes.content}>
            <div className={classes.item}>
              <Text color="greyColor3">SYMBOL</Text>
            </div>
            <div className={classes.item}>
              <Text color="greyColor3">BID</Text>
            </div>
            <div className={classes.item}>
              <Text color="greyColor3">ASK</Text>
            </div>
            <div className={classes.item}></div>
            <div className={classes.item}></div>
            <div className={classes.item}></div>
            <div className={classes.item}></div>
          </div>
          {options &&
            options.map(item => {
              return (
                <div className={classes.content} key={item.id}>
                  <div className={classes.item}>
                    <Text>{item.id}</Text>
                  </div>
                  <div className={classes.item}>
                    <Text>
                      <NumberFormat value={item.bidSpread} options={{ mantissa: 5 }} />
                    </Text>
                  </div>
                  <div className={classes.item}>
                    <Text>
                      <NumberFormat value={item.askSpread} options={{ mantissa: 5 }} />
                    </Text>
                  </div>
                  <div className={classes.item}></div>
                  <div className={classes.item}></div>
                  <div className={classes.item} style={{ flex: 2 }}>
                    <Link to={`/margin/${poolId}/${item.id}`}>
                      <PrimaryButton>Margin Now</PrimaryButton>
                    </Link>
                  </div>
                </div>
              );
            })}
        </CollapsePanel>
      ))}
      <RenderDepositModal
        poolId={showModal.data.poolId}
        visible={showModal.type === 'deposit'}
        onCancel={() => closeModal()}
        onOk={async (account, poolId, amount) => {
          await handleDeposit(account, poolId, amount);
          closeModal();
        }}
      />
      <RenderWithdrawModal
        poolId={showModal.data.poolId}
        visible={showModal.type === 'withdraw'}
        onCancel={() => closeModal()}
        onOk={async (account, poolId, amount) => {
          await handleWithdraw(account, poolId, amount);
          closeModal();
        }}
      />
    </Collapse>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    '&>.ant-collapse-item': {
      border: `1px solid ${theme.darkBorderColor}`,
      background: theme.alwaysWhiteForegroundColor,
      'border-radius': '0.75rem',
      'box-shadow': '0 1px 20px 0 rgba(23, 65, 212, 0.02)',
    },
    '&>.ant-collapse-item:not(:last-child)': {
      'margin-bottom': '1.5rem',
    },
    '&.ant-collapse-borderless>.ant-collapse-item:last-child': {
      'border-radius': '0.75rem',
    },
    '&.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow': {
      left: '1.5rem',
    },
    '&.ant-collapse > .ant-collapse-item > .ant-collapse-header': {
      padding: '0',
    },
    '& .ant-collapse-content-box': {
      padding: 0,
      'border-top': `1px solid ${theme.keyColorGrey}`,
      'margin-left': '3rem',
      'margin-right': '1.5rem',
      'padding-left': '10rem',
    },
    '&.ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box': {
      padding: 0,
      'padding-left': '10rem',
    },
  },
  header: {
    display: 'flex',
    'align-items': 'center',
    'margin-left': '3rem',
    'margin-right': '1.5rem',
    'padding-top': '1.5rem',
    'padding-bottom': '1.5rem',
  },
  poolName: {
    width: '10rem',
  },
  poolDetail: {
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center',
    flex: 1,
  },
  content: {
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center',
    flex: 1,
    '& $item': {
      'padding-top': '1rem',
      'padding-bottom': '1rem',
    },
    '&:not(:last-child)': {
      'border-bottom': `1px solid ${theme.keyColorGrey}`,
    },
  },
  item: {
    flex: 1,
    'padding-left': '1rem',
  },
  action: {
    display: 'flex',
    'justify-content': 'center',
  },
  actionDeposit: {
    color: theme.keyColorBlue,
  },
  actionWidthdraw: {
    color: theme.keyColorRed,
  },
}));

export default RenderPoolsCollapse;
