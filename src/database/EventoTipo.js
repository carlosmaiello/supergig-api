
const Sequelize = require('sequelize');
const database = require('.');
 
const EventoTipo = database.define('evento_tipos', {
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
 
module.exports = EventoTipo;