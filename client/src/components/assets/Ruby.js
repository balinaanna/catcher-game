import React, { useRef } from 'react';
import { ASSET_TYPE } from '../../constants/game';
import useAsset from '../../hooks/useAsset';

function Ruby({deleteAsset, id, viewport}) {
  const assetValue = 50;
  const ref = useRef(null);
  const { assetClassName, assetContainerStyle, assetStyle } = useAsset({assetValue, deleteAsset, id, ref, viewport});

  return (
    <div className="asset-container" style={assetContainerStyle}>
      <div className={`asset ruby ${assetClassName}`} ref={ref} style={assetStyle} />
    </div>
  );
};

Ruby.assetType = ASSET_TYPE.RUBY;

export default Ruby;
