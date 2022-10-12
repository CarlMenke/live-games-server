'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriends extends Model {
    static associate(models) {
    }
  }
  UserFriends.init({
    userId: {
      type:DataTypes.INTEGER,
      references: {
        model:'user',
        key:'id'
      }
    },
    friendId: {
      type:DataTypes.INTEGER,
      references: {
        model:'user',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserFriends',
    tableName: 'userfriends'
  });
  return UserFriends;
};