'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('productCategories', 'parentId', {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('productCategories', 'parentId', {
      type: Sequelize.DataTypes.TINYINT.UNSIGNED,
    })
  },
}
