"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    static associate(models) {
      // define association here
      Match.belongsTo(models.Participation, {
        as: "Participation1",
        foreignKey: "participationId_1",
      });
      Match.belongsTo(models.Participation, {
        as: "Participation2",
        foreignKey: "participationId_2",
      });
    }
  }

  Match.init(
    {
      result: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Match",
    }
  );
  return Match;
};
