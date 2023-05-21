'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VisionMissionGoals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      VisionTitle: {
        type: Sequelize.STRING
      },
      VisionDescription: {
        type: Sequelize.TEXT('long')
      },
      MissionTitle: {
        type: Sequelize.STRING
      },
      MissionDescription: {
        type: Sequelize.TEXT('long')
      },
      GoalTitle: {
        type: Sequelize.STRING
      },
      GoalDescription: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('VisionMissionGoals');
  }
};