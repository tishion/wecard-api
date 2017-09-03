'use strict'
module.exports = function _User(sequelize, DataTypes) {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            wxOpenId: {
                type: DataTypes.CHAR,
                allowNull: false,
            }
        },
        {
            version: true,
            paranoid: true
        }
    );
};