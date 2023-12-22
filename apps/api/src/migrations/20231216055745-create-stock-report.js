'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('stockReports', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'products',
        },
        key: 'id',
      },
    },
    warehouseId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'warehouses',
        },
        key: 'id',
      },
    },
    qtyBefore: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    qtyAfter: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    mutationId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'mutations',
        },
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('stockReports');
}
