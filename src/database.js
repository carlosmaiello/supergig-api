const Sequelize = require("sequelize");

const database = new Sequelize('sqlite:./database.sqlite');


module.exports = database;
