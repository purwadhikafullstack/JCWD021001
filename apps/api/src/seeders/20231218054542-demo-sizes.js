'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sizes', [
      {
        name: 'Small',
        productCategoryId: 2,
      },
      {
        name: 'Medium',
        productCategoryId: 2,
      },
      {
        name: 'Large',
        productCategoryId: 2,
      },
      {
        name: '28',
        productCategoryId: 3,
      },
      {
        name: '30',
        productCategoryId: 3,
      },
      {
        name: '32',
        productCategoryId: 3,
      },
      {
        name: 'Small',
        productCategoryId: 5,
      },
      {
        name: 'Medium',
        productCategoryId: 5,
      },
      {
        name: 'Large',
        productCategoryId: 5,
      },
      // {
      //   name: 'All Size',
      //   productCategoryId: 6,
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sizes', null, {});
  },
};
