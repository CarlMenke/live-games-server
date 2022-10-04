'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversation.belongsToMany(models.User,{
        as:'conversation',
        through:models.userConversation,
        foreignKey:'conversationId'
      }),
      Conversation.hasMany(models.Message,{
        as:'conversationOwner',
        foreignKey:'conversationId'
      })
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