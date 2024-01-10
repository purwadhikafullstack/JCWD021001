'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('productTypes', [
    {
      name: 'T-shirt',
      productCategoryId: 2,
    },
    {
      name: 'Sweatshirts & hoodies',
      productCategoryId: 2,
    },
    {
      name: 'Sweaters & Cardigans',
      productCategoryId: 2,
    },
    {
      name: 'Formal Shirts',
      productCategoryId: 2,
    },
    {
      name: 'Dresses',
      productCategoryId: 2,
    },
    {
      name: 'Jeans & Colored Jeans',
      productCategoryId: 3,
    },
    {
      name: 'Trousers & Ankle Pants',
      productCategoryId: 3,
    },
    {
      name: 'Blousons & Parkas',
      productCategoryId: 5,
    },
    {
      name: 'Jackets & Blazers',
      productCategoryId: 5,
    },
    {
      name: 'Bags',
      productCategoryId: 6,
    },
    {
      name: 'Hats & Caps',
      productCategoryId: 6,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('productTypes', null, {});
}
