import { useEffect, useMemo, useState } from 'react';
import { useGame, useGameDispatch } from '../GameContext';
import {getRandomInRange} from '../utils/numbers';

const CLASSNAME_DISAPPEAR = "disappear";

function useAsset({assetValue, deleteAsset, id, ref, viewport}) {
  const game = useGame();
  const dispatch = useGameDispatch();
  const [assetClassName, setAssetClassName] = useState("");

  const assetSize = useMemo(
    () => {
      const {height, width} = viewport;
      const minDimension = Math.min(height, width);

      return Math.floor(minDimension / 8);
    },
    [viewport],
  );

  const assetStyle = useMemo(
    () => ({
      height: assetSize,
      width: assetSize,
    }),
    [assetSize]
  );

  const assetContainerStyle = useMemo(
    () => ({
      left: getRandomInRange(assetSize / 2, viewport.width - assetSize),
    }),
    [assetSize, viewport]
  );

  useEffect(
    () => {
      const moveInterval = setInterval(
        () => {
          const {x, y, width, height} = ref.current.getBoundingClientRect();
          const asset_coords = {
            x1: x - viewport.left,
            y1: y - viewport.top,
            x2: x + width - viewport.left,
            y2: y + height - viewport.top,
          }

          // delete the asset that fell below the bottom edge
          if (asset_coords.y1 >= viewport.height) {
            deleteAsset(id);
            return;
          }

          const {
            x1: c_x1,
            y1: c_y1,
            x2: c_x2,
            y2: c_y2
          } = game.catcher;

          const {
            x1: a_x1,
            y1: a_y1,
            x2: a_x2,
            y2: a_y2
          } = asset_coords;

          // calculate intersection area of the catcher and the asset elements
          const sIntersection = Math.max(0, Math.min(c_x2, a_x2) - Math.max(c_x1, a_x1)) * Math.max(0, Math.min(c_y2, a_y2) - Math.max(c_y1, a_y1));

          // calculate area of the asset element
          const sAsset = (a_x2 - a_x1) * (a_y2 - a_y1);

          // if at least 1/2 of the asset area overlaps with the catcher - count it caught!
          if (sIntersection / sAsset > 0.5) {
            if (assetClassName !== CLASSNAME_DISAPPEAR) {
              dispatch({
                type: "asset_catch",
                pointsEarned: assetValue,
              });
            }

            setAssetClassName(CLASSNAME_DISAPPEAR); // applies animation
            setTimeout(() => { deleteAsset(id) }, 300);
          };
        },
        1000/60 // 60 frames per second
      );

      return () => {
        clearInterval(moveInterval);
      };
    },
    [assetClassName, assetValue, deleteAsset, dispatch, game, id, ref, viewport],
  );

  return { assetClassName, assetContainerStyle, assetStyle };
}

export default useAsset;
