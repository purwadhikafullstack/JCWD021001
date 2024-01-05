'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('orderProducts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'orders',
        },
        key: 'id',
      },
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'products',
        },
        key: 'id',
      },
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(10,0),
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
      },
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('orderProducts');
}
