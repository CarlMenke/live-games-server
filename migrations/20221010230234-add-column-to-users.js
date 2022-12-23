'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'open_chat_with', Sequelize.STRING)
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('users','open_chat_with')
  }
};
