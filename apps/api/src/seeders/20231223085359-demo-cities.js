'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Jambi',
<<<<<<< HEAD
        provinceId: 3,
=======
        provinceId: 1,
>>>>>>> 26b201f6d505d62723e25fcd870021bcaf072be0
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  },
};
