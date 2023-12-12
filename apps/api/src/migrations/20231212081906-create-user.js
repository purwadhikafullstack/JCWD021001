'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        is: /^[0-9a-f]{64}$/i
      },
    },
    roleId: {
      type: Sequelize.INTEGER,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
    },
    avatar: {
      type: Sequelize.STRING,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}
