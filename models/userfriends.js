'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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