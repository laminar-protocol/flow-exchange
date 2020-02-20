import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { SolidButton } from '../../components';
import { useApp } from '../../hooks/useApp';
import { Impl } from '../../types';

const Home = () => {
  const history = useHistory();
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const setProviderEnable = useApp(state => state.setProviderEnable);
  const [loading, setLoading] = useState('');
  const availableProvider = checkAvailableProvider();

  const handleConnect = async (impl: Impl) => {
    setLoading(impl);

    await setProviderEnable(impl);

    setLoading('');
    history.push('./dashboard');
  };

  return (
    <Container>
      <div className="select-provider">
        {availableProvider.includes('polkadot') ? (
          <SolidButton
            className="select-provider__button"
            loading={loading === 'polkadot'}
            onClick={() => handleConnect('polkadot')}
          >
            Polkadot
          </SolidButton>
        ) : (
          <a
            href="https://github.com/polkadot-js/extension"
            rel="noopener noreferrer"
            target="_blank"
            className="select-provider__link"
          >
            Get Polkadot Extension
          </a>
        )}

        {availableProvider.includes('ethereum') ? (
          <SolidButton
            className="select-provider__button"
            loading={loading === 'ethereum'}
            onClick={() => handleConnect('ethereum')}
          >
            Metamask
          </SolidButton>
        ) : (
          <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank" className="select-provider__link">
            Get Metamask
          </a>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .select-provider {
    margin-top: 300px;
    text-align: center;
  }

  .select-provider__button {
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
  }

  .select-provider__link {
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Home;
