'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add warehouseId to Users
    await queryInterface.addColumn('Users', 'warehouseId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Warehouses',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Remove userId and address from Warehouses
    await queryInterface.removeColumn('Warehouses', 'userId');
    await queryInterface.removeColumn('Warehouses', 'address');
  },

  async down(queryInterface, Sequelize) {
    // Revert changes in Warehouses
    await queryInterface.addColumn('Warehouses', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    await queryInterface.addColumn('Warehouses', 'address', {
      type: Sequelize.STRING
    });

    // Remove warehouseId from Users
    await queryInterface.removeColumn('Users', 'warehouseId');
  }
};
