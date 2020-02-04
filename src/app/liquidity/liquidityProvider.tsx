import { Dropdown, Icon, Menu } from 'antd';
import { FormatBalance, Spinner, Text } from 'components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import selectors from 'selectors';
import styled from 'styled-components';
import * as theme from 'theme';

import Deposit from './deposit';
import Spread from './spread';
import Withdraw from './withdraw';

const MoreIcon = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
  color: ${theme.foregroundColor};
`;

const Provider = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  ::after {
    content: '';
    width: 100%;
    height: 1px;
    background: ${theme.separatorColor};
    margin: 2rem 0;
  }
  :last-child::after {
    content: none;
  }
`;

const Item = styled.div`
  width: 25%;
  ${theme.respondTo.lg`
  width: 50%;
`}

  div {
    margin: 0.5rem 0;
  }

  .ant-spin {
    margin: 2px;
  }
`;

type DropdownKeys = 'deposit' | 'withdraw';

const LiquidityProvider: React.FC<{ pool: Pool; tradingSymbol?: TradingSymbol }> = ({ pool, tradingSymbol }) => {
  const [modal, setModal] = useState<{ [key in DropdownKeys]: boolean }>();

  const liquidity = useSelector(selectors.liquidityPool.liquidity(pool.address));
  const allowedTokens = useSelector(selectors.liquidityPool.allowedTokens(pool.address));

  const handleMenuClick = (e: any) => {
    setModal({ ...{ deposit: false, withdraw: false }, [e.key as DropdownKeys]: true });
  };

  const closeModals = () => {
    setModal(undefined);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="deposit">
        <Icon type="download" style={{ fontSize: '20px', margin: '0.5rem' }} />
        Deposit
      </Menu.Item>
      <Menu.Item key="withdraw">
        <Icon type="upload" style={{ fontSize: '20px', margin: '0.5rem' }} />
        Withdraw
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Provider key={pool.id}>
        <Item>
          <Text size="l" weight="bold">
            {pool.name}
          </Text>
        </Item>
        <Item>
          <div>
            <Text size="s" light>
              Volume
            </Text>
          </div>
          <div>
            <Text size="l">-</Text>
          </div>
        </Item>

        <Item>
          <div>
            <Text size="s" light>
              Liquidity Available
            </Text>
          </div>
          {liquidity && !liquidity.loading ? (
            <div>
              <Text size="l">
                <FormatBalance value={liquidity.value} options={{ currencySymbol: '$', output: 'currency' }} />
              </Text>
            </div>
          ) : (
            <Spinner loading />
          )}
        </Item>
        {tradingSymbol ? (
          <Spread poolAddr={pool.address} tradingSymbol={tradingSymbol} />
        ) : (
          <Item>
            <div>
              <Text size="s" light>
                Market
              </Text>
            </div>
            {allowedTokens && !allowedTokens.loading ? (
              <div>
                <Text size="l">{allowedTokens.value && allowedTokens.value.join(', ')}</Text>
              </div>
            ) : (
              <Spinner loading />
            )}
          </Item>
        )}
        <MoreIcon>
          <Dropdown overlay={menu}>
            <Icon type="more" style={{ fontSize: '20px' }} />
          </Dropdown>
        </MoreIcon>
      </Provider>
      <Deposit visible={modal?.deposit || false} poolAddr={pool.address} onClose={closeModals} />
      <Withdraw visible={modal?.withdraw || false} poolAddr={pool.address} onClose={closeModals} />
    </>
  );
};

export default LiquidityProvider;
