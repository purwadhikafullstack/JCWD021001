'use strict'
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('payments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'orders',
        },
        key: 'id',
      },
    },
    paymentCode: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    grossAmount: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 0),
    },
    paymentDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    paymentMethod: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    paymentStatus: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    paymentMessage: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payments')
}
