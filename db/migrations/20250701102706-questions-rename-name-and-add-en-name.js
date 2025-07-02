'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('questions', 'name', 'ar_name');

    await queryInterface.addColumn('questions', 'en_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'test',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('questions', 'ar_name', 'name');

    await queryInterface.removeColumn('questions', 'en_name');
  },
};