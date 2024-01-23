'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('provinces', [
      {
        name: 'Jambi',
      },
      {
        name: 'Jawa Timur',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('provinces', null, {});
  },
};
