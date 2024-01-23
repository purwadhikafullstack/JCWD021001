'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'andri',
        email: 'andri@gmail.com',
        password: 'Andri123',
        roleId: 1,
      },
      {
        username: 'putu',
        email: 'putu@gmail.com',
        password: 'Putu123',
        roleId: 2,
      },
      {
        username: 'mahmud',
        email: 'mahmud@gmail.com',
        password: 'Mahmud123',
        roleId: 3,
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
