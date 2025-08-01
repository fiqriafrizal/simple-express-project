'use strict';

module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define(
    'Publisher',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'publishers',
      underscored: true,
      timestamps: true,
    }
  );

  return Publisher;
};
