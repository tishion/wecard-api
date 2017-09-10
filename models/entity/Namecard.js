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
            exDepartment: {
                type: DataTypes.CHAR,
            },
            exOccupation: {
                type: DataTypes.CHAR,
            },
            interests: {
                type: DataTypes.STRING,
                set(value) {
                    this.setDataValue('interests', value.join(';'));                    
                },
                get() {
                    return this.getDataValue('interests').split(';');                    
                }
            },
            nonpublic: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            }
        },
        {
            paranoid: true,
            getterMethods: {
                delicateCard() {
                    var cardType = this.getDataValue('cardType');
                    var dataValues = this.dataValues;
                    if ('WORK' == cardType) {
                        delete dataValues.school;
                        delete dataValues.major;
                        delete dataValues.grade;
                    } else if ('STUDY' == cardType) {
                        delete dataValues.company;
                        delete dataValues.department;
                        delete dataValues.occupation;
                        delete dataValues.exCompany;
                        delete dataValues.exDepartment;
                        delete dataValues.exOccupation;
                    }
                    return dataValues;
                }
              },
            setterMethods: {
            }
        }
    );
};