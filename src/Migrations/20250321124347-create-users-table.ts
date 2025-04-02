'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable('users', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      user_name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      email_verified_at: {
          type: DataTypes.DATE,
          allowNull: true,
      },
      password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      remember_token: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      bio: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      profile_picture: {
          type: DataTypes.STRING,
          allowNull: true,
      },
      rating: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0.0,
      },
      credits: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0.0,
      },
      role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "user",
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

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable('users');
  }
};
