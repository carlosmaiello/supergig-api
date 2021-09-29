
const Sequelize = require('sequelize');
const database = require('.');
 
const Evento = database.define('eventos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
 
module.exports = Evento;