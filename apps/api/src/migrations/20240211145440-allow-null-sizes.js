'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'sizes',
          'productCategoryId',
          {
            allowNull: true,
            type: Sequelize.INTEGER,
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

  async down(queryInterface, Sequelize) {},
}
