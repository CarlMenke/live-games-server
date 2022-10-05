'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User,{
        as:'messageUser',
        foreignKey:'senderId'
      })
      Message.belongsTo(models.Conversation,{
        as:'messageConversation',
        foreignKey:'conversationId'
      })
    }
  }
  Message.init({
    content: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
    tableName:'messages'
  });
  return Message;
};