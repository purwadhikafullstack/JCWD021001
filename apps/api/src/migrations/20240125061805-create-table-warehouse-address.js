'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.createTable('WarehouseAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      postalCode: {
        type: Sequelize.INTEGER
      }
    });

    
    await queryInterface.removeColumn('Warehouses', 'cityId');

    
    await queryInterface.addColumn(
      'Warehouses',
      'warehouseAddressId', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'WarehouseAddresses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    
    await queryInterface.addColumn(
      'Warehouses',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Warehouses', 'name');

    
    await queryInterface.addColumn(
      'Warehouses',
      'cityId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    
    await queryInterface.removeColumn('Warehouses', 'warehouseAddressId');

    
    await queryInterface.dropTable('WarehouseAddresses');
  }
};
