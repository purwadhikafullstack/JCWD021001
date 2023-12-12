'use strict';
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
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10,0),
    },
    paymentDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    paymentMethodId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    paymentStatusId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payments');
}

