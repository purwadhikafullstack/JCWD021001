'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('sizes', 'name');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('sizes', {
      fields: ['name'],
      type: 'unique',
      name: 'name',
    });
  },
};
