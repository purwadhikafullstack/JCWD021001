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
    stockId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'stocks',
        },
        key: 'id',
      },
    },
    cartId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'carts',
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
  await queryInterface.dropTable('cartProducts');
}