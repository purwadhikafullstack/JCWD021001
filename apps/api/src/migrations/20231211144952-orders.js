'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    warehouseId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10,0),
    },
    shippingCost: {
      type: Sequelize.DECIMAL(10,0),
    },
    orderDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    orderStatusId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('orders');
}
