const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'databasepassword',
    database: 'agenda-petshop'
});

module.exports = conn;