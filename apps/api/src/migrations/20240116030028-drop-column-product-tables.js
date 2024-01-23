'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('products', 'productGroupId', { transaction: t }),
        queryInterface.removeColumn('products', 'productTypeId', { transaction: t }),
        queryInterface.removeColumn('products', 'productCategoryId', { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
