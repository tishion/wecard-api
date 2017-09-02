'use strict'
module.exports = function _Namecard(sequelize, DataTypes) {
    return sequelize.define('Namecard', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
};