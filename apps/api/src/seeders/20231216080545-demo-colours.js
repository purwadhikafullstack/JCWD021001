'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('colours', [
    {
      name: 'White',
    },
    {
      name: 'Black',
    },
    {
      name: 'Red',
    },
    {
      name: 'Blue',
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('colours', null, {});
}
