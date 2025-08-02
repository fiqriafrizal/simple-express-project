'use strict';

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        writer_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'writers',
                key: 'id'
            }
        },
        publisher_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'publishers',
                key: 'id'
            }
        },
        pages: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'books', 
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Book.associate = function (models) {
        Book.belongsTo(models.Writer, {
            foreignKey: 'writer_id',
            as: 'writer' 
        });
        Book.belongsTo(models.Publisher, { foreignKey: 'publisher_id', as: 'publisher' });
    };

    return Book;
};
