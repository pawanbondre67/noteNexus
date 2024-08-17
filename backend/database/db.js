const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    portl: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;