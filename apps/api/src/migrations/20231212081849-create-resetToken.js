'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('resetTokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    token: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    isUsed: {
      type: Sequelize.BOOLEAN,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('resetTokens');
}
