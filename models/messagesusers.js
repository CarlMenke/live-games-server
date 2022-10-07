'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessagesUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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