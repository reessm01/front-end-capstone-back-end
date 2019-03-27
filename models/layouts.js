'use strict';
module.exports = (sequelize, DataTypes) => {
  const layouts = sequelize.define('layouts', {
    viewModel: DataTypes.JSON
  }, {});
  layouts.associate = function(models) {
    // associations can be defined here
  };
  return layouts;
};