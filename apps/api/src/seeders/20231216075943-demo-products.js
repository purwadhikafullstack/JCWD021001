'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('products', [
    {
      name: 'Plain T-shirt',
      price: 50000,
      description: 'Plain T-shirt',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productGroupId: 3,
      productCategoryId: 1,
      productTypeId: 1,
      colourId: 1,
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('products', null, {});
}
