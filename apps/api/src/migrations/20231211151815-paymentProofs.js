'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('payment_proofs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    paymentId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
    uploadDate: {
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payment_proofs');
}
