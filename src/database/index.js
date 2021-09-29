const Sequelize = require('sequelize');
const sequelize = new Sequelize('supergig_sequelize', 'root', '', {dialect: 'mysql', host: 'localhost'});
 
module.exports = sequelize;