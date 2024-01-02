'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'productCategoryId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'productCategories',
        },
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'productCategoryId');
  },
};
