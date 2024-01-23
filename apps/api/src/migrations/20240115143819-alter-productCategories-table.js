'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('productCategories', 'imageUrl', 'parentId')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('productCategories', 'parentId', 'imageUrl')
  },
}
