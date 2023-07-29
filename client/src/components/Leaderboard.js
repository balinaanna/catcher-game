import React from 'react';
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Button, Container, Header, Segment, Table } from 'semantic-ui-react';

export async function loader({ params }) {
  return fetch("http://localhost:3001/users?order_by=score&order=DESC&limit=100");
}

function Leaderboard() {
  const navigate = useNavigate();
  const users = useLoaderData();

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
              {users.map((user, i) => (
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
