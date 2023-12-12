'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('warehouses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cityId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('warehouses');
}
