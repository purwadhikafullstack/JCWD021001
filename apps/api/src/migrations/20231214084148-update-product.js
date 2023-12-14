'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn('products', 'productGroupId');
  await queryInterface.removeColumn('products', 'productTypeId');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('products', 'productGroupId', {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: 'productGroups',
      },
      key: 'id',
    },
  });
  await queryInterface.addColumn('products', 'productTypeId', {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: 'productTypes',
      },
      key: 'id',
    },
  });
}
