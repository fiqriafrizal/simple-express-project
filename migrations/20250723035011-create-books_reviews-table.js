'use strict';

const userModel = require('../models/user-model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('books_reviews', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      book_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, 
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('books_reviews');
  }
};
