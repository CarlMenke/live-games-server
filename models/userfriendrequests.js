'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriendRequests extends Model {
    static associate(models) {
    }
  }
  UserFriendRequests.init({
    friendrequestId: {
      type:DataTypes.INTEGER
    },
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
    modelName: 'UserFriendRequests',
    tableName: 'userfriendrequests'
  });
  return UserFriendRequests;
};