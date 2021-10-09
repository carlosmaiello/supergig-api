const Sequelize = require("sequelize");

const database = new Sequelize('mysql://root:@localhost:3306/supergig_sequelize');

module.exports = database;
