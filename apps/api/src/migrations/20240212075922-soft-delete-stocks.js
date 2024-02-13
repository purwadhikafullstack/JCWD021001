'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'stocks',
          'deletedAt',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
          { transaction: t },
        ),
      ])
    })
    queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'productCategories',
          'deletedAt',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
          { transaction: t },
        ),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
