'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';
import { listingStatus } from '../Types&Enums/Enums';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable('trades', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      buyer_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      seller_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
      status: {
          type: DataTypes.ENUM(...Object.values(listingStatus)),
          allowNull: false,
      },
      amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      },
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable('trades');
  }
};
