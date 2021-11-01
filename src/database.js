const Sequelize = require("sequelize");


const production = {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
};

const database = new Sequelize(process.env.DATABASE_URL, process.env.NODE_ENV== 'production' ? production : {});


module.exports = database;
