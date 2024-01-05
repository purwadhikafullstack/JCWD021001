'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('paymentProofs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    paymentId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'payments',
        },
        key: 'id',
      },
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    uploadDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('paymentProofs');
}
