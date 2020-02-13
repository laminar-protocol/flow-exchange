import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '../../components';
import * as theme from '../../theme';

const Links: React.FC = () => {
  return (
    <Container>
      <Link to="/margin" className="item-link">
        <div className="item">
          <Icon icon="chart-line" className="link-icon" />
          <div className="title">
            Margin Trading
            <div className="description">Lerverged trading up to 50×</div>
          </div>
        </div>
      </Link>
      <Link to="/swap" className="item-link">
        <div className="item">
          <Icon icon="exchange-alt" className="link-icon" />
          <div className="title">
            Spot Exchange
            <div className="description">Synthetic assets, infinite liquidity</div>
          </div>
        </div>
      </Link>
      <Link to="/lending" className="item-link">
        <div className="item">
          <Icon icon="landmark" className="link-icon" />
          <div className="title">
            Deposit &amp; Earn
            <div className="description">Earn interest on synthetic assets</div>
          </div>
        </div>
      </Link>
      <Link to="/liquidity" className="item-link">
        <div className="item">
          <Icon icon="hand-holding-usd" className="link-icon" />
          <div className="title">
            Liquidity Provider
            <div className="description">Become a counter party &amp; earn</div>
          </div>
        </div>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;

  .item-link {
    ${theme.respondTo.lg`
    width: 100%;
    border: none !important;
    border-bottom: 1px solid ${theme.borderColor} !important;
  `}

    width: 50%;

    &:nth-child(1) {
      border-bottom: 1px solid ${theme.borderColor};
      border-right: 1px solid ${theme.borderColor};
    }

    &:nth-child(2) {
      border-bottom: 1px solid ${theme.borderColor};
    }

    &:nth-child(3) {
      border-right: 1px solid ${theme.borderColor};
    }
  }

  .item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .link-icon {
      font-size: 2rem;
      margin-right: 1.5rem;
    }
    padding: 3rem 1rem;
  }

  .title {
    font-weight: ${theme.boldWeight};
    font-size: 1.25rem;
  }

  .description {
    margin-top: 0.5rem;
    font-size: ${theme.textNormalSize};
    font-weight: ${theme.normalWeight};
    color: ${theme.lightForegroundColor};
  }
`;

export default Links;
