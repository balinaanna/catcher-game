const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  cors = require('cors'),
  path = require('path'),
  dotenv = require('dotenv'),
  socketIo = require('socket.io'),
  http = require('http');

dotenv.config({ path: './.env' });
const db = require('./queries');

const PORT = process.env.PORT || 3001;

const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: FRONTEND_URL
  }
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json()); 
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({
  origin: FRONTEND_URL
}));

app.get('/users', db.getUsers);

app.post('/users', (request, response) => {
  const onCreate = (key, val) => {
    io.to('game-room').emit(key, val);
  }

  db.createUser(request, response, onCreate);
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Catcher game app API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./server/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('client connected: ',socket.id);

  socket.join('game-room');

  socket.on('disconnect', (reason) => {
    console.log(reason);
  })
});

server.listen(PORT, err => {
  if(err) console.log(err);
  console.log('Server running on Port ', PORT);
});
