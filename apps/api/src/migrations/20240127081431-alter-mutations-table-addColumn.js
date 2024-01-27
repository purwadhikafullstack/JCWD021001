'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('mutations', 'stockId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'stocks',
            },
          },
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
