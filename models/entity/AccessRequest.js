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
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            paranoid: true
        }
    );
};