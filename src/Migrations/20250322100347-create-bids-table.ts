'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable('bids', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      listing_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "listings",
              key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      bidder_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
      },
      createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      },
      updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
    },
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable('bids');
  }
};
