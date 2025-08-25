'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    // Step 1: Add a temporary column with the new ENUM values
    await queryInterface.addColumn('trades', 'status_temp', {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    });

    // Step 2: Copy data from old status column to temp column
    await queryInterface.sequelize.query(
      'UPDATE trades SET status_temp = status'
    );

    // Step 3: Remove the old status column (this removes the old ENUM constraint)
    await queryInterface.removeColumn('trades', 'status');

    // Step 4: Rename the temp column to status
    await queryInterface.renameColumn('trades', 'status_temp', 'status');
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    // Step 1: Add a temporary column with the original ENUM values
    await queryInterface.addColumn('trades', 'status_temp', {
      type: DataTypes.ENUM('pending', 'completed'),
      allowNull: false,
      defaultValue: 'pending'
    });

    // Step 2: Copy data from status to temp, converting 'cancelled' to 'pending'
    await queryInterface.sequelize.query(`
      UPDATE trades 
      SET status_temp = CASE 
        WHEN status = 'cancelled' THEN 'pending'
        ELSE status 
      END
    `);

    // Step 3: Remove the current status column
    await queryInterface.removeColumn('trades', 'status');

    // Step 4: Rename temp column back to status
    await queryInterface.renameColumn('trades', 'status_temp', 'status');
  }
};
