import React, { useLayoutEffect, useMemo, useState } from 'react';
import { PrimaryButton } from '../../../components';
import { useLoadTraderInfo } from '../../../store/useMarginPools';
import { RenderDepositModal, RenderWithdrawModal } from '../RenderDepositModal';
import RenderFastTradeModal from './RenderFastTradeModal';

type RenderFastTradeButtonProps = {
  poolId: string;
  pairId: string;
};

const RenderFastTradeButton: React.FC<RenderFastTradeButtonProps> = ({ poolId, pairId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  const hasModalShow = useMemo(() => {
    return showModal || showWithdraw || showDeposit;
  }, [showModal, showWithdraw, showDeposit]);

  const { forceUpdate } = useLoadTraderInfo({ variables: { poolId }, lazy: true });

  useLayoutEffect(() => {
    if (hasModalShow) forceUpdate();
  }, [hasModalShow, forceUpdate]);

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          setShowModal(true);
        }}
      >
        Fast Buy/Sell
      </PrimaryButton>
      {hasModalShow && (
        <>
          <RenderFastTradeModal
            poolId={poolId}
            visible={showModal}
            pairId={pairId}
            openDeposit={() => {
              setShowModal(false);
              setShowDeposit(true);
            }}
            openWithdraw={() => {
              setShowModal(false);
              setShowWithdraw(true);
            }}
            onOk={() => setShowModal(false)}
            onCancel={() => setShowModal(false)}
          />
          <RenderDepositModal
            visible={showDeposit}
            onCancel={() => setShowDeposit(false)}
            poolId={poolId}
            onOk={() => setShowDeposit(false)}
          />

          <RenderWithdrawModal
            visible={showWithdraw}
            onCancel={() => setShowWithdraw(false)}
            poolId={poolId}
            onOk={() => setShowWithdraw(false)}
          />
        </>
      )}
    </div>
  );
};

export default RenderFastTradeButton;
