'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('UserAddresses', 'spesificAddress', 'specificAddress');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('UserAddresses', 'specificAddress', 'spesificAddress');
  }
};
