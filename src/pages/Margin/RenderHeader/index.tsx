import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import {
  Description,
  Dropdown,
  Menu,
  Panel,
  PoolName,
  Row,
  Space,
  SwitchChain,
  Threshold,
  Title,
} from '../../../components';
import { useMarginPoolInfo } from '../../../hooks';
import useMarginPoolsStore from '../../../store/useMarginPools';
import { BaseProps } from '../../../types';
import EnableTrading from './EnableTrading';
import TotalBalance from './TotalBalance';

type MarginHeaderProps = {
  poolId?: string;
  pairId?: string;
  isPool?: boolean;
};

const MarginHeader: React.FC<MarginHeaderProps & BaseProps> = ({ poolId, pairId, isPool, ...other }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const marginInfo = useMarginPoolsStore(state => state.marginInfo);
  const poolInfo = useMarginPoolInfo(poolId);

  const menuDisabled = poolInfo ? poolInfo.options.length <= 1 : true;

  const menu = (
    <Menu>
      {poolInfo && !menuDisabled
        ? poolInfo.options.map(option => {
            return (
              <Menu.Item key={`/margin/${poolInfo.poolId}/${option.pairId}`}>
                <Link to={`/margin/${poolInfo.poolId}/${option.pairId}`}>{option.pairId}</Link>
              </Menu.Item>
            );
          })
        : null}
    </Menu>
  );

  return (
    <Panel padding="0.75rem 2rem" {...other}>
      <Row justify="space-between">
        {isPool && poolInfo && pairId ? (
          <Space>
            <Dropdown overlay={menu} disabled={menuDisabled}>
              <span style={{ cursor: 'pointer' }}>
                <Title type="panel" className={classes.title} style={{ marginRight: 32 }}>
                  {pairId}
                  {!menuDisabled && (
                    <span style={{ position: 'relative', top: 4 }}>
                      <svg height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(102, 102, 102)">
                        <path d="M16 9v2l-4 4.24L8 11V9h8z" fill="rgb(102, 102, 102)" />
                      </svg>
                    </span>
                  )}
                </Title>
              </span>
            </Dropdown>
            <Description layout="vertical" label={t('Pool')}>
              <PoolName value={poolInfo.poolId} type="margin" />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('ENP')}>
              <Threshold
                high={marginInfo.enpThreshold.marginCall}
                low={marginInfo.enpThreshold.stopOut}
                value={poolInfo.enp}
              />
            </Description>
            <div className={classes.separate} />
            <Description layout="vertical" label={t('ELL')}>
              <Threshold
                high={marginInfo.ellThreshold.marginCall}
                low={marginInfo.ellThreshold.stopOut}
                value={poolInfo.ell}
              />
            </Description>
          </Space>
        ) : (
          <div>
            <Title type="panel" className={classes.title}>
              {t('Margin Trading')}
            </Title>
          </div>
        )}

        <Row>
          <TotalBalance />
          <SwitchChain
            renderEthereum={() => {
              return (
                <>
                  <div className={classes.separate} />
                  <EnableTrading />
                </>
              );
            }}
          />
        </Row>
      </Row>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  title: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  separate: {
    width: 1,
    height: '2.75rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    borderLeft: `solid 1px ${theme.keyColorGrey}`,
  },
}));

export default MarginHeader;
