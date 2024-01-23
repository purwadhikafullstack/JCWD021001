'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Jambi',
        provinceId: 1,
      },
      {
        name: 'Surabaya',
        provinceId: 2,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {})
  },
}
