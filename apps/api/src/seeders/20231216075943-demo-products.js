'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('products', [
    {
      name: 'rompi',
      price: 200000,
      description: 'rompi',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productGroupId: 1,
      productTypeId: 1,
      colourId: 1,
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('products', null, {});
}
