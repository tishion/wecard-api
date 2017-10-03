'use strict'
module.exports = function _GroupMember(sequelize, DataTypes) {
    var GroupMember = sequelize.define(
        'GroupMember',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            groupId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            cardId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            hidden: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            indexes: [{
                fields: ['groupId', 'userId'],
                unique: true
            }]
        }
    );

    // GroupMember.associate = function (db) {
    //     GroupMember.belongsTo(db.Namecard, {
    //         as: 'Namecard', 
    //         foreignKey: 'cardId', 
    //         targetKey: 'id'
    //     });
    // }

    return GroupMember;
};