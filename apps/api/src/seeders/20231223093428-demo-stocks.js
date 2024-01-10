'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stocks', [
      {
        productId: 2,
        warehouseId: 2,
        sizeId: 1,
        colourId: 1,
        qty: 10,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stocks', null, {});
  },
};
