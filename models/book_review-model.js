'use strict';

module.exports = (sequelize, DataTypes) => {
    const BookReview = sequelize.define('BookReview', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        book_id: {
            type: DataTypes.BIGINT,
            allowNull: false, 
            references: {
                model: 'books',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    }, {
        tableName: 'book_reviews', 
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    BookReview.associate = function (models) {
        BookReview.belongsTo(models.Book, { foreignKey: 'book_id', as: 'book' });
        BookReview.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    };

    return BookReview;
};
