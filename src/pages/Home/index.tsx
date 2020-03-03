import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { SolidButton } from '../../components';
import { useApp } from '../../hooks/useApp';
import { ChainType } from '../../services/Api';

const Home = () => {
  const history = useHistory();
  const checkAvailableProvider = useApp(state => state.checkAvailableProvider);
  const setApiEnable = useApp(state => state.setApiEnable);
  const [loading, setLoading] = useState('');
  const [availableProvider, setAvailableProvider] = useState<ChainType[]>([]);

  const handleConnect = async (chainType: ChainType) => {
    setLoading(chainType);
    await setApiEnable(chainType);
    setLoading('');

    history.push('./dashboard');
  };

  useEffect(() => {
    setAvailableProvider(checkAvailableProvider());

    const timeId = setTimeout(() => {
      setAvailableProvider(checkAvailableProvider());
    }, 100);

    return () => clearTimeout(timeId);
  }, [checkAvailableProvider, setAvailableProvider]);

  return (
    <Container>
      <div className="select-provider">
        {availableProvider.includes('laminar') ? (
          <SolidButton
            className="select-provider__button"
            loading={loading === 'laminar'}
            onClick={() => handleConnect('laminar')}
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
