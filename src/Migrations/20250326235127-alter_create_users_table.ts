'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.changeColumn('Users', 'rating', {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    });

    await queryInterface.changeColumn('Users', 'credits', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100.0,
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.changeColumn('Users', 'rating', {
      type: DataTypes.FLOAT,
      allowNull: false,
    });

    await queryInterface.changeColumn('Users', 'credits', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  }
};
