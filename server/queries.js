const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const getUsers = (request, response) => {
  const limit = request.query.limit ? request.query.limit : 20;
  const order_by = request.query.order_by ? request.query.order_by : 'id';
  const order = request.query.order ? request.query.order : 'ASC';

  pool.query(`SELECT * FROM users ORDER BY ${order_by} ${order} LIMIT ${limit}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const createUser = (request, response) => {
  const { name, score } = request.body;

  pool.query('INSERT INTO users (name, score) VALUES ($1, $2) RETURNING *', [name, score], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(results.rows[0]);
  })
};

module.exports = {
  getUsers,
  createUser,
};
