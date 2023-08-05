const Pool = require('pg').Pool;

const pool = new Pool({connectionString: process.env.DATABASE_URL});

const getUsers = (request, response) => {
  const limit = request.query.limit ? request.query.limit : 20;
  const orderBy = request.query.order_by ? request.query.order_by : 'id';
  const orderDesc = request.query.desc === 'true' ? 'DESC' : '';

  pool.query(`SELECT * FROM users\
    ORDER BY\
      CASE WHEN $1 = 'score' THEN score END ${orderDesc},\
      CASE WHEN $1 = 'name' THEN name END ${orderDesc},\
      CASE WHEN $1 = 'created_at' THEN created_at END ${orderDesc},\
      CASE WHEN $1 = 'updated_at' THEN updated_at END ${orderDesc},\
      id\
    LIMIT $2`, [orderBy, limit], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

const createUser = (request, response, onCreate) => {
  const { name, score } = request.body;

  pool.query('INSERT INTO users (name, score) VALUES ($1, $2) RETURNING *', [name, score], (error, results) => {
    if (error) {
      throw error;
    }

    onCreate('user_created', results.rows[0]);
    response.status(201).send(results.rows[0]);
  })
};

module.exports = {
  getUsers,
  createUser,
};
