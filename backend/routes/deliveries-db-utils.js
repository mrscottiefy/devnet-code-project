var Sequelize = require('sequelize');
var config = require("../config");
var db = config.database;

const sequelize = new Sequelize(db.dbname, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: 'mysql'
});

//model
let Deliveries;

(async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    Deliveries = sequelize.define('deliveries', {
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        payment: {
            type: Sequelize.FLOAT,
            field: 'payment'
        },
        image: {
            type: Sequelize.STRING,
            field: 'image'
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
})();

async function insertRecord(data){
    return Deliveries.create(data)
}

async function getAllRecords(){
    return await Deliveries.findAll();
}

module.exports = {insertRecord,getAllRecords};