'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'leo',
      lastName: 'corpuz',
      email: 'admin@gmail.com',
      password: '$2a$10$14OsjwU45TVpW/LPalfJnOrjzUpXAojvaAcJMy1a1GgxTzavR2eP6',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
