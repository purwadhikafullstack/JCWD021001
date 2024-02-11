'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stocks', [
      {
        productId: 1,
        warehouseId: 3,
        sizeId: 1,
        colourId: 1,
        qty: 20,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        productId: 2,
        warehouseId: 3,
        sizeId: 2,
        colourId: 2,
        qty: 15,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
      {
        productId: 3,
        warehouseId: 3,
        sizeId: 3,
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
