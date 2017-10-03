'use strict'
module.exports = function _AccessRequest(sequelize, DataTypes) {
    var AccessRequest = sequelize.define(
        'AccessRequest',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            toNamecardId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            toUserId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            fromNamecardId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            fromUserId: {
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
            indexes: [{
                fields: ['toNamecardId', 'fromNamecardId'],
                unique: true
            }]
        }
    );
    
    AccessRequest.associate = function (db) {
        AccessRequest.belongsTo(db.Namecard, {as: 'toNamecard', foreignKey: 'toNamecardId', targetKey: 'id'});
        AccessRequest.belongsTo(db.Namecard, {aas: 'fromNamecard', foreignKey: 'fromNamecardId', targetKey: 'id'});
    }

    return AccessRequest;
};