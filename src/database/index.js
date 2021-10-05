const Sequelize = require("sequelize");

const database = new Sequelize('sqlite:./database.sqlite');

// const database = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite'
// });

// const database = new Sequelize('mysql://root:@localhost:3306/supergig_sequelize');

// const database = new Sequelize("supergig_sequelize", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// });




module.exports = database;
