'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('messages','conversationId')
    queryInterface.addColumn('messages', 'recieverId', Sequelize.INTEGER)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('messages','recieverId')
    queryInterface.addColumn('messages', 'conversationId', Sequelize.INTEGER)
  }
};
