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
      reference: {
        model: {
          tableName: 'orders',
        },
        key: 'id',
      },
    },
    pricePaid: {
      allowNull: false,
      type: Sequelize.DECIMAL(10,0),
    },
    paymentDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    paymentMethodId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'paymentMethods',
        },
        key: 'id',
      },
    },
    paymentStatusId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: {
          tableName: 'paymentStatuses',
        },
        key: 'id',
      },
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payments');
}

