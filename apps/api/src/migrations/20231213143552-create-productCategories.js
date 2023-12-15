'use strict';

/** @type {import('sequelize-cli').Migration} */
exports;
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('productCategories', {
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
    imageUrl: {
      type: Sequelize.STRING,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('productCategories');
}
