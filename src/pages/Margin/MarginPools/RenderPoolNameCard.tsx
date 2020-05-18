import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { Amount, Description, Panel, PoolName, Row, Text } from '../../../components';
import { useMarginPoolInfo } from '../../../hooks';
import { IdentityIcon } from '../../../icons';
import useMargin from '../hooks/useMargin';

type RenderPoolNameCardProps = {
  poolId: string | 'ALL_POOLS';
};

const RenderPoolNameCard: React.FC<RenderPoolNameCardProps> = React.memo(({ poolId }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const setState = useMargin(state => state.setState);

  const selectedPoolId = useMargin(state => state.selectedPoolId);
  const poolInfo = useMarginPoolInfo(poolId);

  const isALl = poolId === 'ALL_POOLS';
  const isSelectedALl = isALl && selectedPoolId === '';

  return (
    <Panel
      className={clsx(classes.card, {
        [classes.all]: isALl,
        [classes.activeCard]: selectedPoolId === poolId || isSelectedALl,
      })}
      onClick={() =>
        setState(state => {
          state.selectedPoolId = isALl ? '' : poolId;
        })
      }
    >
      {isALl ? (
        <div>
          <Text className={classes.text}>{t('All Pools')}</Text>
        </div>
      ) : (
        <Row style={{ height: '100%' }}>
          <div className={classes.poolIcon}>
            <IdentityIcon size={32} value={poolInfo?.owner} />
          </div>
          <Description
            layout="vertical"
            label={
              <div>
                <Text size="n">
                  <PoolName value={poolId} type="margin" />
                </Text>
                <Text size="s" style={{ paddingLeft: '0.25rem' }}>
                  AVAILABLE
                </Text>
              </div>
            }
            className={classes.pool}
          >
            <Amount value={poolInfo?.balance} loading={!poolInfo} />
          </Description>
        </Row>
      )}
    </Panel>
  );
});

const useStyles = createUseStyles(theme => ({
  text: {},
  card: {
    width: '13.125rem',
    marginRight: '1rem',
    height: '4rem',
    background: theme.lightBackgroundColor,
    cursor: 'pointer',
    '&:hover': {
      extend: '$activeCard',
    },
    '&$all': {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      '& $text': {
        fontSize: '1.25rem',
      },
    },
  },
  activeCard: {
    'box-shadow': '0 1px 20px 0 rgba(23, 65, 212, 0.18)',
    '& $text': {
      color: '#0155ff',
    },
    extend: theme.linearGradientRadiusBorder,
  },
  poolIcon: {
    height: '100%',
    display: 'flex',
    'align-items': 'center',
    padding: '0.5rem',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  pool: {
    flex: 1,
    'margin-left': '1rem',
    height: '100%',
  },
  all: {},
}));

export default RenderPoolNameCard;
