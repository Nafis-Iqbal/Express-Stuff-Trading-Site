'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';
import { listingStatus } from '../Types&Enums/Enums';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    // For MySQL, we need to modify the column to include the new ENUM value
    // MySQL allows adding new values to ENUM, but we need to recreate the column
    
    // First, add a temporary column with the new enum values
    await queryInterface.addColumn('listings', 'status_temp', {
      type: DataTypes.ENUM('available', 'pending', 'sold', 'cancelled'),
      allowNull: true
    });
    
    // Copy data from old column to new column
    await queryInterface.sequelize.query(`
      UPDATE listings SET status_temp = status;
    `);
    
    // Drop the old column
    await queryInterface.removeColumn('listings', 'status');
    
    // Rename the temporary column to the original name
    await queryInterface.renameColumn('listings', 'status_temp', 'status');
    
    // Update the column to be non-nullable with default value
    await queryInterface.changeColumn('listings', 'status', {
      type: DataTypes.ENUM('available', 'pending', 'sold', 'cancelled'),
      allowNull: false,
      defaultValue: 'available'
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    // Reverse the migration - remove 'pending' from the enum
    
    // Add temporary column with old enum values
    await queryInterface.addColumn('listings', 'status_temp', {
      type: DataTypes.ENUM('available', 'sold', 'cancelled'),
      allowNull: true
    });
    
    // Copy data, converting 'pending' to 'available'
    await queryInterface.sequelize.query(`
      UPDATE listings SET status_temp = 
        CASE 
          WHEN status = 'pending' THEN 'available'
          ELSE status
        END;
    `);
    
    // Drop the current column
    await queryInterface.removeColumn('listings', 'status');
    
    // Rename the temporary column
    await queryInterface.renameColumn('listings', 'status_temp', 'status');
    
    // Update the column properties
    await queryInterface.changeColumn('listings', 'status', {
      type: DataTypes.ENUM('available', 'sold', 'cancelled'),
      allowNull: false,
      defaultValue: 'available'
    });
  }
};
