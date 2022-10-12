'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsToMany(models.User,{
        as:'userfriend',
        through:models.MessagesUsers,
        foreignKey:'userfriendsId'
      })
    }
  }
  Message.init({
    content: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    recieverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
    tableName:'messages'
  });
  return Message;
};