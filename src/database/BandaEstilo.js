
const Sequelize = require('sequelize');
const database = require('.');
 
const BandaEstilo = database.define('banda_estilos', {
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
 
module.exports = BandaEstilo;