'use strict'
module.exports = function _Namecard(sequelize, DataTypes) {
    return sequelize.define(
        'Namecard',
        {
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
                type: DataTypes.ENUM('WORK', 'STUDY'),
                defaultValue: 'WORK',
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

            },
            interests: {
                type: DataTypes.STRING,
            },
            nonpublic: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            }
        },
        {
            paranoid: true,            
            getterMethods: {
                interests: function interests_getter() {
                    return this.getDataValue('interests').split(';');
                }
            },
            setterMethods: {
                interests: function interests_setter(value) {
                    this.setDataValue('interests', value.join(';'));
                }
            },
        }
    );
};