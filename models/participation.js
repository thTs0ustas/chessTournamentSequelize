"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class Participation extends Model {
    static associate(models) {
      // define association here
      Participation.belongsTo(models.Player);
      Participation.hasMany(models.Match);
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
