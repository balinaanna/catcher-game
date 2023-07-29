import React, { useCallback, useEffect, useState } from 'react';
import Grimalda from './assets/Grimalda';
import Amethyst from './assets/Amethyst';
import Ruby from './assets/Ruby';
import Rudolph from './assets/Rudolph';
import Columbus from './assets/Columbus';
import Pippin from './assets/Pippin';
import {generateObjectId} from '../utils/strings';
import {getRandomProperty} from '../utils/objects';
import { ASSET_TYPE } from '../constants/game';

function getRandomAssetComponent() {
  const assetType = getRandomProperty(ASSET_TYPE);
  var component;

  switch(assetType) {
    case(ASSET_TYPE.GRIMALDA):
      component = Grimalda;
      break;
    case(ASSET_TYPE.AMETHYST):
      component = Amethyst;
      break;
    case(ASSET_TYPE.RUBY):
      component = Ruby;
      break;
    case(ASSET_TYPE.RUDOLPH):
      component = Rudolph;
      break;
    case(ASSET_TYPE.COLUMBUS):
      component = Columbus;
      break;
    case(ASSET_TYPE.PIPPIN):
      component = Pippin;
      break;
    default:
      component = null;
  }

  return component;
}

function AssetFactory({viewport}) {
  const [assets, setAssets] = useState([]);

  const deleteAsset = useCallback((id) => {
    setAssets(assets => {
      return assets.filter(a => (a.id !== id));
    })
  }, [setAssets]);

  useEffect(
    () => {
      const emitInterval = setInterval(
        () => {
          const id = generateObjectId(assets);

          setAssets(assets => {
            const AssetComponent = getRandomAssetComponent();

            const component = (
              <AssetComponent
                id={id}
                deleteAsset={deleteAsset}
                key={id}
                viewport={viewport}
              />);

            return ([...assets, {id, component}]);
          })
        },
        1000
      );

      return () => {
        clearInterval(emitInterval);
      };
    },
    [],
  );

  return assets.map((asset) => asset.component);
}

export default AssetFactory;
