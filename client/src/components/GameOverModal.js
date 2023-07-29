import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Grid, Icon, Input, Modal, Statistic } from 'semantic-ui-react';
import { useGame } from '../GameContext';
import { REACT_APP_API_URL } from '../constants/game';

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL_GAME_OVER':
      return { open: true };
    case 'CLOSE_MODAL_GAME_OVER':
      return { open: false };
    default:
      throw new Error();
  }
}

function GameOverModal() {
  const navigate = useNavigate();
  const game = useGame();
  const [state, dispatch] = useReducer(reducer, {open: false});
  const { open } = state;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  
  useEffect(
    () => {
      dispatch({ type: 'OPEN_MODAL_GAME_OVER' });
    },
    []
  );

  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL_GAME_OVER' }),
    [dispatch]
  );

  const handleCancel = useCallback(
    () => {
      closeModal();

      return navigate("/");
    },
    [closeModal]
  );

  const saveResult = useCallback(
    async () => {
      const {score} = game;
      const data = { name, score };

      if (name.trim() === "") {
        setNameError(true);
      } else {
        setNameError(false);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };
        await fetch(`${REACT_APP_API_URL}/users`, requestOptions);
        
        closeModal();
        
        return navigate("/leaderboard");
      }
    },
    [closeModal, game, name]
  );

  const handleNameChange = useCallback(
    (event) => {
      setName(event.target.value);
      setNameError(false);
    },
    [setName]
  );

  return (
    <Modal
    open={open}
    onClose={closeModal}
    size="tiny"
  >
    <Modal.Header>Save your result</Modal.Header>
    <Modal.Content>
      <Grid stackable columns={2}>
        <Grid.Column width={4}>
          <Statistic size="tiny">
            <Statistic.Value>
              <Icon name='star' color="yellow" />{game.score}
            </Statistic.Value>
            <Statistic.Label>Your score</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column width={12}>
          <Input
            error={nameError}
            fluid
            placeholder='Enter your name...'
            value={name}
            onChange={handleNameChange}
          />
          </Grid.Column>
      </Grid>
    </Modal.Content>
    <Modal.Actions>
      <Button negative basic onClick={handleCancel}>
        Cancel
      </Button>
      <Button positive onClick={saveResult}>
        Save my result
      </Button>
    </Modal.Actions>
  </Modal>
  );
}

export default GameOverModal;

