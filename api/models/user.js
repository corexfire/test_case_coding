// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
            isEmail: true // Validate email format
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure mobile_number is unique
        validate: {
            is: /^\d{6,}$/ // Validate mobile_number format
        }
    },
    foto: {
        type: DataTypes.BLOB('long'), // Adjust size if necessary, 'long' is for large files
        allowNull: false
    }
});

module.exports = User;
