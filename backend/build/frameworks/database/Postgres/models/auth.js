"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInterviewerModel = exports.initStudentModel = exports.initCompanyModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const initCompanyModel = (sequelize) => {
    return sequelize.define('companies', {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ValidationToken: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
        },
    });
};
exports.initCompanyModel = initCompanyModel;
const initStudentModel = (sequelize) => {
    return sequelize.define('students', {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        ValidationToken: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
        },
    });
};
exports.initStudentModel = initStudentModel;
const initInterviewerModel = (sequelize) => {
    return sequelize.define('interviewers', {
        id: {
            type: sequelize_1.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        ValidationToken: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_2.UUIDV4,
        },
    });
};
exports.initInterviewerModel = initInterviewerModel;
