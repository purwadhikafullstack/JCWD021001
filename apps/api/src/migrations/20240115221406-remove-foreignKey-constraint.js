'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint(
          'producttypetoproductgroups',
          'producttypetoproductgroups_ibfk_1',
          { transaction: t },
        ),
        queryInterface.removeConstraint(
          'producttypetoproductgroups',
          'producttypetoproductgroups_ibfk_2',
          { transaction: t },
        ),
      ])
    })
  },

  async down(queryInterface, Sequelize) {},
}
