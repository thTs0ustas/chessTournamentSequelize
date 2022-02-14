"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participation extends Model {
    static associate(models) {
      // define association here
      Participation.belongsTo(models.Player);
      Participation.belongsTo(models.Match);
    }
  }
  Participation.init(
    {},
    {
      sequelize,
      modelName: "Participation",
    }
  );
  return Participation;
};
