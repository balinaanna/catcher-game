# catcher-game
This is a simple Catcher game application that includes a leaderboard of top players.

*ExpressJS, ReactJS*

## Start the app

Clone the repo.

##### Install backend dependencies

```sh
cd catcher-game
npm i
```
##### Create a Postgres database
```sh
CREATE DATABASE catcher_development;
```
Your Postgres configuration should look like this:

> user: postgres
> 
> password: password
>
> host: localhost
>
> port: 5432

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
npm  start
```
The frontend app will run on [`http://localhost:3000/`](http://localhost:3000/)

## API doc

Check [`http://localhost:3001/api-docs`](http://localhost:3001/api-docs) for generated Swagger api documentation.
