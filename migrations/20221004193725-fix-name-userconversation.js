'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameTable('userConversations', 'userconversations')
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameTable('userconversations', 'userConversations')
  }
};
