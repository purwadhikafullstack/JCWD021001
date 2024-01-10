'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'colourId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'colourId'),
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'colours',
          },
          key: 'id',
        },
      };
  },
};
