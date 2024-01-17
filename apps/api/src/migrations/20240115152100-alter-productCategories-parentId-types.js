'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('productCategories', 'parentId', {
      type: Sequelize.DataTypes.INTEGER,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('productCategories', 'id', {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    })
  },
}
