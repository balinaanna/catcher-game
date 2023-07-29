import React, { useRef } from 'react';
import { ASSET_TYPE } from '../../constants/game';
import useAsset from '../../hooks/useAsset';

function Pippin({deleteAsset, id, viewport}) {
  const assetValue = 50;
  const ref = useRef(null);
  const { assetClassName, assetContainerStyle, assetStyle } = useAsset({assetValue, deleteAsset, id, ref, viewport});

  return (
    <div className="asset-container" style={assetContainerStyle}>
      <div className={`asset pippin ${assetClassName}`} ref={ref} style={assetStyle} />
    </div>
  );
};

Pippin.assetType = ASSET_TYPE.PIPPIN;

export default Pippin;
