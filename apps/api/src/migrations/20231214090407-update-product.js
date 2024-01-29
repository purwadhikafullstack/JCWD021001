'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'productGroupId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'productGroups',
      },
      key: 'id',
    },
  })
  await queryInterface.addColumn('products', 'productTypeId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'productTypes',
      },
      key: 'id',
    },
  })
  await queryInterface.addColumn('products', 'colourId', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'colours',
      },
      key: 'id',
    },
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('products', 'productGroupId')
  await queryInterface.removeColumn('products', 'productTypeId')
  await queryInterface.removeColumn('products', 'colourId')
}
