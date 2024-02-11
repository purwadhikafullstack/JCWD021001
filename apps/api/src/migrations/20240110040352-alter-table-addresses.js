'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('userAddresses', 'fullName',{
      type: DataTypes.STRING
    });
    await queryInterface.addColumn('userAddresses', 'phoneNumber', {
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('userAddresses', 'fullName');
    await queryInterface.removeColumn('userAddresses', 'phoneNumber');
  }
};
