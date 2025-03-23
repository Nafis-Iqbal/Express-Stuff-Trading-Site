'use strict';

import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.createTable('listing_tags', {
      listing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "listings", key: "id" },
      },
      tag_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "tags", key: "id" },
      }
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.dropTable('listing_tags');
  }
};
