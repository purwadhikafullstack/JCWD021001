'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductTypeToProductGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'producttypes',
          },
        },
      },
      productGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'productgroups',
          },
        },
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductTypeToProductGroups')
  },
}
