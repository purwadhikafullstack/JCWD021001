'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('productImages', [
      {
        imageUrl: 'tshirt_1.jpg',
        productId: 1,
      },
      {
        imageUrl: 'tshirt_2.jpg',
        productId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productImages', null, {});
  },
};
