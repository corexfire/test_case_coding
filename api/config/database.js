const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apbatech_test', 'root', '', {
    dialect: 'mysql'
});

module.exports = sequelize;