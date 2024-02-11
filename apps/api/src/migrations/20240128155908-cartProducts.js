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
      unique: true,
      reference: {
        model: {
          tableName: 'products',
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
    colourId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'colours',
        },
        key: 'id',
      },
    },
    sizeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'sizes',
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
