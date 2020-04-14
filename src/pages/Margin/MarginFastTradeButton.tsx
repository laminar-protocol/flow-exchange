import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import useApp, { useAppApi, AppState } from '../../hooks/useApp';
import { PrimaryButton } from '../../components';
import MarginFastTradeModal from './MarginFastTradeModal';
import { MarginDepositModal, MarginWithdrawModal } from './MarginHandleModal';

type MarginFastTradeButtonProps = {
  data: AppState['margin']['poolInfo']['string'];
  pairId: string;
};

const MarginFastTradeButton: React.FC<MarginFastTradeButtonProps> = ({ data, pairId }) => {
  const [showModal, setShowModal] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  return (
    <div>
      <PrimaryButton
        onClick={event => {
          setShowModal(true);
          event.stopPropagation();
          event.preventDefault();
        }}
      >
        Fast Buy/Sell
      </PrimaryButton>
      <MarginFastTradeModal
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
      <MarginDepositModal
        visible={showDeposit}
        onCancel={() => setShowDeposit(false)}
        data={data}
        onOk={() => setShowDeposit(false)}
      />

      <MarginWithdrawModal
        visible={showWithdraw}
        onCancel={() => setShowWithdraw(false)}
        data={data}
        onOk={() => setShowWithdraw(false)}
      />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({}));

export default MarginFastTradeButton;