import React, { useEffect, useState } from 'react';
import { useGame } from '../GameContext';
import { Icon, Statistic } from 'semantic-ui-react';

function InfoPanel({isGameStarted, onTimeout}) {
  const game = useGame();
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [timer, setTimer] = useState();

  useEffect(
    () => {
      if (isGameStarted) {
        const timer = setInterval(() => {
          setSecondsLeft(secondsLeft => --secondsLeft);
        }, 1000);

        setTimer(timer);

        return () => {
          clearInterval(timer);
          setTimer(undefined);
          setSecondsLeft(0);
        };
      }
    },
    [isGameStarted]
  );

  useEffect(
    () => {
      if (secondsLeft <= 0) {
        clearInterval(timer);
        setTimer(undefined);
        setSecondsLeft(0);
        onTimeout();
      }
    },
    [onTimeout, secondsLeft, setTimer, timer]
  );

  return (
    <div className="info-panel">
      <div className="right">
        <Statistic size="small" className="score" color={game.score < 0 ? "red" : "black"}>
          <Statistic.Value>
            <Icon name='star' color="yellow" />
            {game.score}
          </Statistic.Value>
          <Statistic.Label>Your score</Statistic.Label>
        </Statistic>

        <Statistic size="small" className="countdown" color={secondsLeft < 10 ? "red" : "black"}>
          <Statistic.Value>
            {secondsLeft}
          </Statistic.Value>
          <Statistic.Label>Time</Statistic.Label>
        </Statistic>
      </div>
    </div>
  );
}

export default InfoPanel;
