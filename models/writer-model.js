'use strict';

module.exports = (sequelize, DataTypes) => {
    const Writer = sequelize.define('Writer', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'writers',
        underscored: true,
        timestamps: true
    });

    return Writer;
}
