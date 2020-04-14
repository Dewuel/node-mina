'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nickName: DataTypes.STRING,
    avator: DataTypes.STRING,
    gender: DataTypes.STRING,
    openid: DataTypes.STRING,
    realName: DataTypes.STRING,
    phone: DataTypes.STRING,
    isBroker: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};