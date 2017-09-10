'use strict'
module.exports = function _AccessRequest(sequelize, DataTypes) {
    return sequelize.define(
        'AccessRequest',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            namecardId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            fromUserId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            toUserId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
                defaultValue: 'PENDING',
                allowNull: false,
            }
        },
        {
            paranoid: true,
            indexes: [{
                fields: ['namecardId', 'fromUserId'],
                unique: true
            }]
        }
    );
};