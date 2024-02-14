'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if the column exists as the old name before trying to rename it
    const tableDesc = await queryInterface.describeTable('userAddresses');
    if (tableDesc['spesificAddress']) {
      await queryInterface.renameColumn('userAddresses', 'spesificAddress', 'specificAddress');
    }
  },

  async down (queryInterface, Sequelize) {
    // Reverse the renaming for rollback purposes
    const tableDesc = await queryInterface.describeTable('userAddresses');
    if (tableDesc['specificAddress']) {
      await queryInterface.renameColumn('userAddresses', 'specificAddress', 'spesificAddress');
    }
  }
};
