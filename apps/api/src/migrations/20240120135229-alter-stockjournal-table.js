'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'stockjournals',
          'qtyBefore',
          {
            type: DataTypes.INTEGER,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'stockjournals',
          'qtyAfter',
          {
            type: DataTypes.INTEGER,
          },
          { transaction: t },
        ),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
