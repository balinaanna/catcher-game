import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext(null);
const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    gameReducer,
    initialState
  );

  return (
    <GameContext.Provider value={tasks}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

function gameReducer(game, action) {
  switch (action.type) {
    case "catcher_position_update": {
      return ({...game,
        catcher: {
          ...game.catcher,
            x1: action.catcher.x1,
            y1: action.catcher.y1,
            x2: action.catcher.x2,
            y2: action.catcher.y2,
        }
      });
    }
    case "asset_catch": {
      return ({...game, score: (game.score + action.pointsEarned)});
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialState = {
  catcher: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  },
  score: 0,
};
