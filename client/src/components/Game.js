import React, { useCallback, useEffect, useRef, useState } from 'react';
import AssetFactory from './AssetFactory';
import Catcher from './Catcher';
import InfoPanel from './InfoPanel';
import GameOverModal from './GameOverModal';
import GameStartModal from './GameStartModal';
import { GameProvider } from '../GameContext';

function Game() {
  const [viewport, setViewport] = useState({height: 0, width: 0});
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userX, setUserX] = useState(0);

  const appRef = useRef(null);

  const updateViewport = useCallback(
    () => {
      if (!appRef.current) { return; }

      const {height, width, left, top} = appRef.current.getBoundingClientRect();

      setViewport(
        viewport => ({...viewport, height, width, left, top})
      );
    },
    [appRef, setViewport],
  );

  useEffect(updateViewport, []);

  const handleMouseMove = useCallback((event) => {
    if (!appRef.current) { return; }

    setUserX(event.clientX - appRef.current.getBoundingClientRect().left);
  }, [appRef, setUserX]);

  useEffect(
    () => {
      window.addEventListener("resize", updateViewport);
      const selfElement = appRef.current;
      selfElement.addEventListener("mousemove", handleMouseMove);
    
      return () => {
        window.removeEventListener("resize", updateViewport);
        selfElement.removeEventListener("mousemove", handleMouseMove);
      }
    },
    [handleMouseMove, updateViewport],
  );

  const startGame = useCallback(
    () => { setIsGameStarted(true) },
    [setIsGameStarted],
  );

  const endGame = useCallback(
    () => { setIsGameOver(true) },
    [setIsGameOver],
  );

  return (
    <GameProvider>
      <div className="game-container">
        <div
          className="game-bg"
          ref={appRef}
        >
          <GameStartModal onTimeout={startGame} />
          <InfoPanel isGameStarted={isGameStarted} onTimeout={endGame} />
          <Catcher isGameStarted={isGameStarted} isGameOver={isGameOver} userX={userX} viewport={viewport} />
          {isGameStarted && !isGameOver && <AssetFactory viewport={viewport} />}
          {isGameOver && <GameOverModal />}
        </div>
      </div>
    </GameProvider>
  );
}

export default Game;
