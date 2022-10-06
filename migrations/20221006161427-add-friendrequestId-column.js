'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('userfriendrequests','friendrequestId', {type:Sequelize.INTEGER} )
  },
  async down (queryInterface, Sequelize) {
    queryInterface.addColumn('friendrequestId', 'userfriendrequests')
  }
};
