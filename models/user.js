'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Conversation,{
        as:'participant',
        through: {model:models.userConversation},
        foreignKey:'userId'
      })
      User.hasMany(models.Message,{
        as:'sender',
        foreignKey:'senderId',
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
    socket: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};