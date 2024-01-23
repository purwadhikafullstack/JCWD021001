'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'stockJournals',
          'stockId',
          {
            type: DataTypes.INTEGER,
            references: {
              model: {
                tableName: 'stocks',
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
