'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('sub_fields', 'name', 'ar_name');

    await queryInterface.addColumn('sub_fields', 'en_name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'test',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('sub_fields', 'ar_name', 'name');

    await queryInterface.removeColumn('sub_fields', 'en_name');
  },
};