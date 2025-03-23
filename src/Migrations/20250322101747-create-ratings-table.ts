'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    queryInterface.createTable('ratings', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      rating: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      listing_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      rating_giver_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id",
          }
      },
      rating_taker_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id",
          }
      },
      comment: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      }
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    queryInterface.dropTable('ratings');
  }
};
