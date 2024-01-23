'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'products',
          'productCategoryId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: {
                tableName: 'productCategories',
              },
              key: 'id',
            },
          },
          { transaction: t },
        ),
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('products', 'productCategoryId', { transaction: t }),
      ])
    })
  },
}
