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
      productCategoryId: 1,
    },
    {
      name: 'Oversized T-shirt',
      price: 50000,
      description: 'Oversized T-shirt',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 2,
    },
    {
      name: 'Plain T-shirt',
      price: 60000,
      description: 'Plain T-shirt',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 1,
    },
    {
      name: 'Oversized T-shirt',
      price: 60000,
      description: 'Oversized T-shirt',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 2,
 
    },
    {
      name: 'Regular Jeans',
      price: 150000,
      description: 'Regular Jeans',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 1,
    },
    {
      name: 'Regular Jeans',
      price: 150000,
      description: 'Regular Jeans',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 2,
    },
    {
      name: 'Reversible Parka',
      price: 180000,
      description: 'Reversible Parka',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 1,
    },
    {
      name: 'Reversible Parka',
      price: 180000,
      description: 'Reversible Parka',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 2,
    },
    {
      name: 'Sling Bag',
      price: 130000,
      description: 'Sling Bag',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 1,
    },
    {
      name: 'Sling Bag',
      price: 130000,
      description: 'Sling Bag',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      productCategoryId: 1,
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('products', null, {});
}
