'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('questions_manifest', 'name', 'ar_name');

    await queryInterface.addColumn('questions_manifest', 'en_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'test',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('questions_manifest', 'ar_name', 'name');

    await queryInterface.removeColumn('questions_manifest', 'en_name');
  },
};