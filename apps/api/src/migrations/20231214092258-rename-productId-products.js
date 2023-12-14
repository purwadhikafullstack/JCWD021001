'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.renameColumn('products', 'productId', 'id');
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.renameColumn('products', 'id', 'productId');
}
