'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    queryInterface.createTable('tags', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      title: {
          type: DataTypes.STRING,
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
    queryInterface.dropTable('tags');
  }
};
