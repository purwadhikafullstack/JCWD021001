'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.renameColumn('mutations', 'senderWarehouseId', 'requesterWarehouseId', {
          transaction: t,
        }),
        queryInterface.renameColumn('mutations', 'receiverWarehouseId', 'recipientWarehouseId', {
          transaction: t,
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
