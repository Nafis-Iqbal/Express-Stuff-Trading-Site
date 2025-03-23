'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';
import { listingStatus } from '../Types&Enums/Enums';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable('listings', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      exchange_items: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      price: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      status: {
          type: DataTypes.ENUM(...Object.values(listingStatus)),
          allowNull: false,
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      },
      updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      },
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable('listings');
  }
};
