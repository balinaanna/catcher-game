import React, { useCallback, useEffect, useMemo } from 'react';
import { useGameDispatch } from '../GameContext';

function Catcher({ isGameStarted, isGameOver, userX, viewport }) {
  const dispatch = useGameDispatch();

  const catcherSize = useMemo(
    () => {
      const {height, width} = viewport;
      const minDimension = Math.min(height, width);

      return Math.floor(minDimension / 5);
    },
    [viewport],
  );

  const getX1 = useCallback(() => {
    return Math.min(
      viewport.width - catcherSize, 
      Math.max(0, userX - catcherSize/2)
    );
  }, [catcherSize, userX, viewport]);

  const isPlayingNow = useMemo(
    () => isGameStarted && !isGameOver,
    [isGameStarted, isGameOver]
  );

  const style = useMemo(
    () => {
      const bottom =  Math.floor(catcherSize / 4);

      return ({
        bottom,
        height: catcherSize,
        width: catcherSize,
        left: isPlayingNow ? `${getX1()}px` : "50%",
        marginLeft: isPlayingNow ? 0 : -catcherSize / 2,
      });
    },
    [isPlayingNow, catcherSize, getX1],
  );

  useEffect(
    () => {
      dispatch({
        type: "catcher_position_update",
        catcher: {
          x1: getX1(),
          y1: viewport.height - catcherSize - Math.floor(catcherSize / 4),
          x2: getX1() + catcherSize,
          y2: viewport.height - Math.floor(catcherSize / 4),
        },
      });
    },
    [catcherSize, dispatch, getX1, viewport],
  );

  return (
    <div className="catcher" style={style} />
  );
}

export default Catcher;
