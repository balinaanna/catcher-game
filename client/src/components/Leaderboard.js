import React, { useCallback, useEffect, useState } from 'react';
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { io } from 'socket.io-client';
import { Button, Container, Header, Segment, Table } from 'semantic-ui-react';
import { REACT_APP_API_URL } from '../constants/game';

export async function loader({ params }) {
  return fetch(`${REACT_APP_API_URL}/users?order_by=score&desc=true&limit=100`);
}

function Leaderboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(useLoaderData());

  const handleUserCreated = useCallback(
    (data) => {
        setUsers(users => {
          users.push(data);

          return users.sort((a, b) => b.score - a.score).slice(0, 100);
        });
    },
    [setUsers]
  );

  useEffect(() => {
    const socket = io(REACT_APP_API_URL);
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("user_created", (data) => {
      handleUserCreated(data);
    });
  }, []);

  return (
    <Container>
      <Segment vertical>
          <Button
            content="Home"
            icon="home"
            onClick={() => { navigate("/"); }}
          />

          <Header size='large'>
            Top 100 Players
          </Header>

          <Table celled striped selectable>
            <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Place
              </Table.HeaderCell>
              <Table.HeaderCell>
                Score
              </Table.HeaderCell>
              <Table.HeaderCell>
                Player
              </Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
              { users?.map && users.map((user, i) => (
                <Table.Row key={user.id}>
                  <Table.Cell collapsing>
                    {i + 1}
                  </Table.Cell>
                  <Table.Cell collapsing>
                    <strong>{user.score}</strong>
                  </Table.Cell>
                  <Table.Cell>
                    {user.name}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
      </Segment>
    </Container>
  );
}

export default Leaderboard;
