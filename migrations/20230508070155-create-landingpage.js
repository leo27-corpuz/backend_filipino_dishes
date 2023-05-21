'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Landingpages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mainTitle: {
        type: Sequelize.STRING
      },
      mainDescription: {
        type: Sequelize.TEXT('long'),
      },
      mainImage: {
        type: Sequelize.STRING
      },
      subImage: {
        type: Sequelize.STRING
      },
      popularDishesTitle: {
        type: Sequelize.STRING
      },
      popularDishesDescription: {
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Landingpages');
  }
};