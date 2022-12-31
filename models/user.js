'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Message,{
        as:'userfriend',
        through:models.MessagesUsers,
        foreignKey:'userfriendsId',
      })
      User.belongsToMany(models.User,{
        as:'friend',
        through: models.UserFriends,
        foreignKey: 'userId'
      })
      User.belongsToMany(models.User,{
        as:'friendrequestsent',
        through: models.UserFriendRequests,
        foreignKey: 'userId'
      })
      User.belongsToMany(models.User,{
        as:'friendrequestrecieved',
        through: models.UserFriendRequests,
        foreignKey: 'friendId'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    socket: DataTypes.STRING,
    open_chat_with: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};