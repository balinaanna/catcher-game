import React from 'react';
import { Link } from "react-router-dom";
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';

function Home() {
  return (
    <Container>
      <Segment vertical textAlign="center">
        <Header as="h1">
          Hi, Catchers! Welcome to the game...
        </Header>

        <List size="big">
          <List.Item>
            The game only lasts for 60 seconds.
          </List.Item>
          <List.Item>
            Move the catcher left or right to catch the items.
          </List.Item>
          <List.Item>
            The items drop from top to bottom.
          </List.Item>
          <List.Item>
            <div className="asset small ruby" />
            <div className="asset small rudolph" />
            <div className="asset small pippin" />
            <div className="asset small columbus" />
            Catching the image <strong>+50 points</strong>
          </List.Item>
          <List.Item>
            <div className="asset small grimalda" />
            <div className="asset small amethyst" />
            Catching the image <strong>-100 points</strong>
          </List.Item>
        </List>
      </Segment>

      <Segment vertical textAlign="center">
        <Grid stackable columns={2}>
          <Grid.Column width={8}>
            <Link
              to="/play"
              className="ui button huge green fluid"
              >
              <i className="gamepad icon"></i>
              Start Game
            </Link>
          </Grid.Column>

          <Grid.Column width={8}>
            <Link
              to="/leaderboard"
              className="ui button huge red fluid"
              >
              <i className="trophy icon"></i>
              Leaderboard
            </Link>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}

export default Home;
