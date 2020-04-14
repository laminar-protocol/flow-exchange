import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Dialog, Space } from '../../components';
import { AppState } from '../../hooks/useApp';
import MarginPoolDashboard from './MarginPoolDashboard';
import MarginTrade from './MarginTrade';

type MarginHandleModalProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  openDeposit: () => void;
  openWithdraw: () => void;
  data: AppState['margin']['poolInfo']['string'];
  pairId: string;
};

export const MarginFastTradeModal: React.FC<MarginHandleModalProps> = ({
  visible,
  openWithdraw,
  openDeposit,
  onCancel,
  onOk,
  data,
  pairId,
}) => {
  const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    return onCancel();
  }, [onCancel]);

  const handleSubmit = useCallback(() => {
    onOk();
  }, [onOk]);

  return (
    <Dialog
      title={t('Fast Buy/Sell')}
      visible={visible}
      onOk={() => handleSubmit()}
      width="35rem"
      onCancel={() => handleCancel()}
      footer={null}
    >
      <Space size={24} direction="vertical" style={{ marginBottom: 48 }}>
        <MarginPoolDashboard poolInfo={data} openDeposit={openDeposit} openWithdraw={openWithdraw} />
        <MarginTrade poolInfo={data} pairId={pairId} />
      </Space>
    </Dialog>
  );
};

export default MarginFastTradeModal;
