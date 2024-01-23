'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint('productTypes', 'producttypes_ibfk_1', { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
