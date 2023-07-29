import React, { useRef } from 'react';
import { ASSET_TYPE } from '../../constants/game';
import useAsset from '../../hooks/useAsset';

function Grimalda({deleteAsset, id, viewport}) {
  const assetValue = -100;
  const ref = useRef(null);
  const { assetClassName, assetContainerStyle, assetStyle } = useAsset({assetValue, deleteAsset, id, ref, viewport});

  return (
    <div className="asset-container" style={assetContainerStyle}>
      <div className={`asset grimalda ${assetClassName}`} ref={ref} style={assetStyle} />
    </div>
  );
};

Grimalda.assetType = ASSET_TYPE.GRIMALDA;

export default Grimalda;
