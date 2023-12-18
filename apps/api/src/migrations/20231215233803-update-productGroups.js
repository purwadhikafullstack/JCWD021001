'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('productGroups', 'name', {
    type: Sequelize.STRING,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('productGroups', 'name', {
    type: Sequelize.INTEGER,
  });
}
