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
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName:'users'
  });
  return User;
};