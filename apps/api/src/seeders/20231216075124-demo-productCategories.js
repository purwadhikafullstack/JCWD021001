'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('productCategories', [
    {
      name: 'Men',
    },
    {
      name: 'Tops',
      parentId: 1
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('productCategories', null, {});
}
