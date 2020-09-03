import { options } from '@laminar/api';
import React, { useEffect, useMemo, useState, useReducer } from 'react';
import { createUseStyles } from 'react-jss';
import { useApp } from '../../../store/useApp';

const UploadMetadata: React.FC = () => {
  const classes = useStyles();
  const [metadata, setMetadata] = useState<any>();
  const [known, setKnown] = useState<any>();
  const forceUpdate = useReducer(x => x + 1, 0)[1];
  const api = useApp(app => app.api);
  const laminarApi = useMemo(() => {
    //@ts-ignore
    return api?.chainType === 'laminar' ? api?.asLaminar?.apiProvider?.api : undefined;
  }, [api]);

  useEffect(() => {
    try {
      //@ts-ignore
      window.injectedWeb3['polkadot-js']
        .enable()
        .then((extension: any) => {
          setMetadata(extension?.metadata);
          return extension?.metadata.get().then((known: any) => {
            setKnown(known);
          });
        })
        .catch(() => {
          setMetadata(undefined);
          setKnown(undefined);
        });
    } catch {
      setMetadata(undefined);
    }
  }, [forceUpdate]);

  const chainInfo = useMemo(() => {
    if (!laminarApi?._runtimeChain?.toString()) return;
    return {
      chain: laminarApi._runtimeChain.toString(),
      genesisHash: laminarApi.genesisHash.toHex(),
      icon: 'substrate',
      metaCalls: Buffer.from(laminarApi.runtimeMetadata.asCallsOnly.toU8a()).toString('base64'),
      specVersion: laminarApi.runtimeVersion.specVersion.toNumber(),
      ss58Format: !isNaN(laminarApi.registry.chainSS58) ? laminarApi.registry.chainSS58 : 42,
      tokenDecimals: !isNaN(laminarApi.registry.chainDecimals) ? laminarApi.registry.chainDecimals : 12,
      tokenSymbol: laminarApi.registry.chainToken || 'Unit',
      types: options({}).types,
    };
  }, [laminarApi]);

  const checkUpload = useMemo(() => {
    if (known && chainInfo) {
      return !known.find((obj: any) => {
        return obj.genesisHash === chainInfo.genesisHash && obj.specVersion === chainInfo.specVersion;
      });
    } else {
      return false;
    }
  }, [chainInfo, known]);

  const upload = async () => {
    await metadata.provide(chainInfo);
    forceUpdate();
  };

  if (!checkUpload) return null;

  return (
    <div className={classes.uploadMetadata}>
      <div
        className={classes.btn}
        onClick={() => {
          upload();
        }}
      >
        Upload Metadata
      </div>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  uploadMetadata: {
    display: 'flex',
    flexDirection: 'flex-end',
    marginTop: '16px',
  },
  btn: {
    fontSize: '0.875rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: '#0155ff',
    padding: '4px 8px',
    borderRadius: 11.5,
    boxShadow: '0 0 4px 0 rgba(6, 35, 96, 0.06)',
    border: 'solid 1px rgba(1, 85, 255, 0.2)',
  },
}));

export default UploadMetadata;
