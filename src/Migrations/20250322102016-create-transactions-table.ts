'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    queryInterface.createTable('transactions', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      listing_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      trade_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "trades",
              key: "id",
          },
      },
      buyer_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      seller_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false,
      }
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    queryInterface.dropTable('transactions');
  }
};
