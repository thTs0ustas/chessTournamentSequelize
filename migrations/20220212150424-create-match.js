"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Matches", {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      participationId_1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: "compositeIndex",
        references: {
          model: "participations",
          key: "id",
        },
      },
      participationId_2: {
        allowNull: false,
        unique: "compositeIndex",
        type: Sequelize.INTEGER,
        references: {
          model: "participations",
          key: "id",
        },
      },
      result: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Matches");
  },
};
