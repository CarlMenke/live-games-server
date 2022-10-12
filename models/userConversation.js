'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userConversation extends Model {
    static associate(models) {
    }
  }
  userConversation.init({
    conversationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userConversation',
    tableName:'userconversations'
  });
  return userConversation;
};