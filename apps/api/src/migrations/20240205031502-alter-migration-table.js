'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn('mutations', 'isAccepted', {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: null,
        }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
