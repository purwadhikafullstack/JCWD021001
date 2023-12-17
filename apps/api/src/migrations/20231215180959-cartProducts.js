'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('cartProducts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    cartId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('cartProducts');
}