'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('productCategories', 'createdAt', { transaction: t }),
        queryInterface.removeColumn('productCategories', 'updatedAt', { transaction: t }),
        queryInterface.removeColumn('productCategories', 'deletedAt', { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
