const {Sequelize} = require('sequelize');
require('dotenv').config();

let db;

try {
     db = new Sequelize({
        dialect : 'postgres',
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        port : process.env.DB_PORT,
        host : process.env.DB_HOST
    });
} catch (e) {
    console.log('Database sequelize error!');
}

async function db_connect()
{
    try 
    {
        await db.authenticate();
        await db.sync();
        console.log('Database connected!');
    } catch (e) {
        console.log('Database not connected')
    }
}

module.exports = {db, db_connect}

