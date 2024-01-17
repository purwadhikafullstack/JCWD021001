'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('productCategories', 'parentId', {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DataTypes.TINYINT.UNSIGNED,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('productCategories', 'parentId', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    })
  },
}
