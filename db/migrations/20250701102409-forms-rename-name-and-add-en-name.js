'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('forms', 'name', 'ar_name');

    await queryInterface.addColumn('forms', 'en_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'test',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('forms', 'ar_name', 'name');

    await queryInterface.removeColumn('forms', 'en_name');
  },
};