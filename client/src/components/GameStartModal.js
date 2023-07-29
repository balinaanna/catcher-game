import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Modal } from 'semantic-ui-react';

const TIME_TO_START = 3;

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL_GAME_START':
      return { open: true };
    case 'CLOSE_MODAL_GAME_START':
      return { open: false };
    default:
      throw new Error();
  }
}

function GameStartModal({onTimeout}) {
  const [state, dispatch] = useReducer(reducer, {open: false})
  const { open } = state
  
  const [gameStartInterval, setGameStartInterval] = useState();
  const [time, setTime] = useState(TIME_TO_START);

  const showModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL_GAME_START' }),
    [dispatch]
  );

  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL_GAME_START' }),
    [dispatch]
  );
  
  useEffect(
    () => {
      showModal();

      const interval = setInterval(() => {
        setTime(timer => --timer);
      }, 1000);

      setGameStartInterval(interval);

      return () => {
        clearInterval(interval);
        setGameStartInterval(undefined);
      };
    },
    [],
  );

  useEffect(
    () => {
      if (time <= 0) {
        clearInterval(gameStartInterval);
        setGameStartInterval(undefined);

        closeModal();
        onTimeout();
      }
    },
    [closeModal, gameStartInterval, onTimeout, setGameStartInterval, time]
  );

  return (
    <Modal
      basic
      closeOnDimmerClick={false}
      open={open}
      onClose={closeModal}
      size="tiny"
    >
      <Modal.Content>
        <span className="gamestart-countdown">
          {time}
        </span>
      </Modal.Content>
    </Modal>
  );
}

export default GameStartModal;
