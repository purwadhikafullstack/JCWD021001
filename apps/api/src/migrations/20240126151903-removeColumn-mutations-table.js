'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('mutations', 'productId', { transaction: t }),
        queryInterface.removeColumn('mutations', 'statusId', { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
