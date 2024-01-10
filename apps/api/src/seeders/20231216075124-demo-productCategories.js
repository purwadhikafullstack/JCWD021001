'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('productCategories', [
    {
      name: 'Tops',
    },
    {
      name: 'Bottoms',
    },
    {
      name: 'Dresses',
    },
    {
      name: 'Outerwear',
    },
    {
      name: 'Accesories',
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('productCategories', null, {});
}
