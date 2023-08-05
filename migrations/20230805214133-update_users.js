'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.renameColumn("users", "createdAt", "created_at", {
        transaction,
      });
      await queryInterface.renameColumn("users", "updatedAt", "updated_at", {
        transaction,
      });
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.renameColumn("users", "created_at", "createdAt", {
        transaction,
      });
      await queryInterface.renameColumn("users", "updated_at", "updatedAt", {
        transaction,
      });
    });
  }
};
