const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json()); 
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/users', db.getUsers);
app.post('/users', db.createUser);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
