'use strict'
module.exports = function _CardcaseItem(sequelize, DataTypes) {
    return sequelize.define(
        'CardcaseItem',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            cardcaseId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            itemId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            itemType: {
                type: DataTypes.ENUM('CARD', 'GROUP'),
                defaultValue: 'CARD',
                allowNull: false,
            },
            name: {
                type: DataTypes.CHAR,
                allowNull: false,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            paranoid: true,
            indexes: [{
                fields: ['cardcaseId', 'itemId', 'itemType'],
                unique: true
            }]
        }
    );
};