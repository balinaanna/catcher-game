/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - score
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         score:
 *           type: integer
 *           description: The user score
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         id: 123
 *         name: David
 *         score: 1600
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
  *   get:
 *     summary: Lists the users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: order_by
 *         schema:
 *           type: string
 *           default: 'score'
 *         description: The user property to order the results list by
 *       - in: query
 *         name: desc
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: The keyword that specifies the descending order
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: '5'
 *         description: The max number of records to return
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           name:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: 'David'
 *             score: 1600
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */