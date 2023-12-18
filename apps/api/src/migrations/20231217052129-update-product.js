'use strict';

console.log(new Date(Date.now()));

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('products', 'createdAt', {
    defaultValue: new Date(Date.now()),
  });
  await queryInterface.changeColumn('products', 'updatedAt', {
    defaultValue: new Date(Date.now()),
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('products', 'createdAt', {
    defaultValue: null,
    allowNull: true,
  });
  await queryInterface.changeColumn('products', 'updatedAt', {
    defaultValue: null,
    allowNull: true,
  });
}
