'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      writer_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'writers',
          key: 'id'
        }
      },
      publisher_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'publishers',
          key: 'id'
        }
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('books');
  }
};
