'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint('mutations', 'mutations_ibfk_3', { transaction: t }),
        queryInterface.removeConstraint('mutations', 'mutations_ibfk_4', { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
