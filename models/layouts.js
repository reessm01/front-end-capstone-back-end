'use strict';
module.exports = (sequelize, DataTypes) => {
  const layouts = sequelize.define('layouts', {
    layout: {
      type: DataTypes.JSON
    },
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    defaultScope:{
      attributes:{
        exclude: ["createdAt", "id"]
      }
    }
  });
  layouts.associate = function(models) {
    // associations can be defined here
  };
  return layouts;
};