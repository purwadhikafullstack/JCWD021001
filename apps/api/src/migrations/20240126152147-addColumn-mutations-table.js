'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'mutations',
          'stockJournalIdRecipient',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {
                tableName: 'stockJournals',
              },
            },
            key: 'id',
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'mutations',
          'stockJournalIdRequester',
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: {
                tableName: 'stockJournals',
              },
            },
            key: 'id',
          },
          { transaction: t },
        ),
        queryInterface.addColumn('mutations', 'isAccepted', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
