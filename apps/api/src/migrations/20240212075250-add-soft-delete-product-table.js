'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('products', 'deletedAt', {
          type: Sequelize.DATE,
          allowNull: true,
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
