import React, { useState } from 'react';

import { PrimaryButton } from '../../../components';
import { AppState } from '../../../store/useApp';
import { RenderDepositModal, RenderWithdrawModal } from '../RenderDepositModal';
import RenderFastTradeModal from './RenderFastTradeModal';

type RenderFastTradeButtonProps = {
  data: AppState['margin']['poolInfo']['string'];
  pairId: string;
};

const RenderFastTradeButton: React.FC<RenderFastTradeButtonProps> = ({ data, pairId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <div>
      <PrimaryButton
        onClick={() => {
          setShowModal(true);
        }}
      >
        Fast Buy/Sell
      </PrimaryButton>
      <RenderFastTradeModal
        data={data}
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
        data={data}
        onOk={() => setShowDeposit(false)}
      />

      <RenderWithdrawModal
        visible={showWithdraw}
        onCancel={() => setShowWithdraw(false)}
        data={data}
        onOk={() => setShowWithdraw(false)}
      />
    </div>
  );
};

export default RenderFastTradeButton;
