'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('fields', 'name', 'ar_name');

    await queryInterface.addColumn('fields', 'en_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'test',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('fields', 'ar_name', 'name');

    await queryInterface.removeColumn('fields', 'en_name');
  },
};