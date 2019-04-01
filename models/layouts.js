'use strict';
module.exports = (sequelize, DataTypes) => {
  const layouts = sequelize.define('layouts', {
    layout: {
      id: DataTypes.Integer,
      type: DataTypes.JSON
    },
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  }, {
    defaultScope:{
      attributes:{
        exclude: ["createdAt"]
      }
    }
  });
  layouts.associate = function(models) {
    // associations can be defined here
  };
  return layouts;
};