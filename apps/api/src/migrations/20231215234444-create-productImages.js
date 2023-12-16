'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable('productImages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    imageUrl: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'products',
        },
        key: 'id',
      },
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('productImages');
}
