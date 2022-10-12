'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessagesUsers extends Model {
    static associate(models) {
    }
  }
  MessagesUsers.init({
    userfriendsId: {
      type:DataTypes.INTEGER,
      references: {
        model:'userfriends',
        key:'id'
      }
    },
    content: DataTypes.STRING,
    senderId: {
      type:DataTypes.INTEGER,
      references: {
        model:'user',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'MessagesUsers',
    tableName: 'messagesusers'
  });
  return MessagesUsers;
};