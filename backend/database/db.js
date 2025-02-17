const mysql = require("mysql2");
require("dotenv").config();
const url = require("url");


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  connectTimeout: 10000 // Increase connection timeout to 10 seconds
});
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    
    // connectTimeout: 10000 // Increase connection timeout to 10 seconds
    };

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
