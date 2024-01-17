'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      type: 'foreign key',
      fields: ['productGroupId'],
      name: 'products_productGroupId_foreign_idx',
      references: {
        table: 'productGroups',
        field: 'id',
      },
    })
    await queryInterface.addConstraint('products', {
      type: 'foreign key',
      fields: ['productTypeId'],
      name: 'products_productTypeId_foreign_idx',
      references: {
        table: 'productTypes',
        field: 'id',
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      type: 'foreign key',
      fields: ['productGroupId'],
      name: 'products_productGroupId_foreign_idx',
      references: {
        table: 'productGroups',
        field: 'id',
      },
    })
    await queryInterface.addConstraint('products', {
      type: 'foreign key',
      fields: ['productTypeId'],
      name: 'products_productTypeId_foreign_idx',
      references: {
        table: 'productTypes',
        field: 'id',
      },
    })
  },
}
