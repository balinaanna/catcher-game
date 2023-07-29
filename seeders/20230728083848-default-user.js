'use strict';

var hoaxer = require('hoaxer');
const users = [...Array(120)].map((user) => (
  {
    name: hoaxer.name.firstName(),
    score: hoaxer.datatype.number({min: -200, max: 800}),
  }
));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
