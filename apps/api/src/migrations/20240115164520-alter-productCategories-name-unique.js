'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('productCategories', 'name')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('productCategories', {
      fields: ['name'],
      type: 'unique',
      name: 'name',
    })
  },
}
