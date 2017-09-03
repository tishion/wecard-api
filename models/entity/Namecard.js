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
        },
        cardType: {
            type: DataTypes.ENUM('EMPLOYEE','STUDENT'),
            defaultValue: 'STUDENT',
            allowNull: false
        },
        avatarUri: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        name: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        phone: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        residence: {
            type: DataTypes.CHAR,            
        },
        hometown: {
            type: DataTypes.CHAR,
        },
        company: {
            type: DataTypes.CHAR,
            
        },
        department: {
            type: DataTypes.CHAR,

        },
        occupation: {
            type: DataTypes.CHAR,
            allowNull: false            
        },
        school: {
            type: DataTypes.CHAR,
            
        },
        major: {
            type: DataTypes.CHAR,
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exCompany: {
            type: DataTypes.CHAR,
            
        },
        department: {
            type: DataTypes.CHAR,

        },
        exOccupation: {
            type: DataTypes.CHAR,
            
        }
    });
};