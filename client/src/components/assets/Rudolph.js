import React, { useRef } from 'react';
import { ASSET_TYPE } from '../../constants/game';
import useAsset from '../../hooks/useAsset';

function Rudolph({deleteAsset, id, viewport}) {
  const assetValue = 50;
  const ref = useRef(null);
  const { assetClassName, assetContainerStyle, assetStyle } = useAsset({assetValue, deleteAsset, id, ref, viewport});

  return (
    <div className="asset-container" style={assetContainerStyle}>
      <div className={`asset rudolph ${assetClassName}`} ref={ref} style={assetStyle} />
    </div>
  );
};

Rudolph.assetType = ASSET_TYPE.RUDOLPH;

export default Rudolph;
