'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stocks', [
      {
        productId: 15,
        warehouseId: 3,
        sizeId: 42,
        colourId: 2,
        qty: 10,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        productId: 15,
        warehouseId: 3,
        sizeId: 43,
        colourId: 3,
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
