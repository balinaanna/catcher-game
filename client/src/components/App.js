import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Game from './Game';
import Home from './Home';
import Leaderboard, { loader as leaderboardLoader } from './Leaderboard';
import 'semantic-ui-css/semantic.min.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play",
    element: <Game />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
    loader: leaderboardLoader,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
