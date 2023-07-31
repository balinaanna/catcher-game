# catcher-game
This is a simple Catcher game application that includes a leaderboard of top players.

*ExpressJS, ReactJS, PostgreSQL*

### [Play Online](https://catcher-game-25556b0b3db6.herokuapp.com/) on desktop or mobile!

## Start the app

Clone the repo.

##### Install backend dependencies

```sh
cd catcher-game
npm i
```
##### Configure a Postgres database
Configure variables in `.env` to support PG connection.

Then create a database.
```sh
CREATE DATABASE catcher_development;
```

##### Install sequelize-cli globally to be able to run our DB migrations and seeds
```sh
npx install -g sequelize-cli
```
You may need to open a new terminal tab at this point.

##### Run migrations and seeds
```sh
npx sequelize db:migrate
npx sequelize db:seed:all
```

##### Start the API server
```sh
npm start
```
The server app will run on [`http://localhost:3001/`](http://localhost:3001/)

##### Install frontend dependencies and start the app
```sh
cd client
npm i
npm start
```
The frontend app will run on [`http://localhost:3000/`](http://localhost:3000/)

## API doc

Check [`http://localhost:3001/api-docs`](http://localhost:3001/api-docs) or this [Heroku link](https://catcher-game-25556b0b3db6.herokuapp.com/api-docs) for generated Swagger api documentation.

## Future nice-to-have’s

* Add user authentication so that the score can be updated for the user (right now it creates a new record each time user saves their * result).
* Typescriptify js code.
* Work on UI design.
* Add more animations to improve user feedback.
