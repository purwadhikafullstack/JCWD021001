'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Warehouses', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('Warehouses', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('Warehouses', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    });
  },
  
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Warehouses', 'deletedAt');
    await queryInterface.removeColumn('Warehouses', 'createdAt');
    await queryInterface.removeColumn('Warehouses', 'updatedAt');
  }
};
