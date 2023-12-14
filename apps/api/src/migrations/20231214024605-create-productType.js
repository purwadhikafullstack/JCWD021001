'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('productTypes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    productCategoryId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'productCategories',
        },
        key: 'id',
      },
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('productTypes');
}
