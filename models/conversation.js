'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
    }
  }
  Conversation.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName:'conversations'
  });
  return Conversation;
};